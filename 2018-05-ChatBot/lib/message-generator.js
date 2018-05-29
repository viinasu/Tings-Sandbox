const responses = {
    welcome: (options) => {
        return {
            type: "text",
            text: `Welcome ${options.name}!`
        }
    },
    weather: (options) => {
        return {
            type: "text",
            text: `Currently it's ${ options.current_temp }. ${ options.current_summary }`
        }
    },
    unprocessable: () => {
        return {
            type: "text",
            text: "Sorry I cannot help you with that."
        }
    }
};


const generateMessage = ({ category, options }) => {
    let messages = [];
    messages.push(responses[category](options));
    return messages;
};

module.exports = generateMessage;