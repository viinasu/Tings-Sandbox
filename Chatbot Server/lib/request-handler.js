const { getGeocode, getWeather } = require("./external-apis");
const parseMessage = require("./message-parser");
const generateMessage = require("./message-generator");

const handleRequest = (req) => {
  if (req.body.action === "join") {
    const options = { name: req.body.name };

    return new Promise((resolve) => {
      resolve({ messages: generateMessage({ category: "welcome", options }) });
    });
  }

  if (req.body.action === "message") {
    return new Promise((resolve) => {
      const parsedMessage = parseMessage(req.body.text.toLowerCase());

      if (parsedMessage.category === "weather") {
        getGeocode(parsedMessage.options.address)
                    .then(getWeather)
                    .then((data) => {
                      resolve({ messages: generateMessage({ category: "weather", options: data }) });
                    });
      } else {
        resolve({ messages: generateMessage({ category: "unprocessable" }) });
      }
    });
  }

  return new Promise((resolve) => {
    resolve({ messages: generateMessage({ category: "unprocessable" }) });
  });
};

module.exports = handleRequest;
