const FILLER_WORDS = {
    "what": true,
    "what's": true,
    "is": true,
    "in": true,
    "the": true
};

const isolateAddress = (wordList) => {
    return wordList.filter((word) => !FILLER_WORDS[word]);
};

const parseMessage = (message) => {
    let category, options;

    let wordList = message.split(" ");

    if (wordList.indexOf("weather") > -1) {
        category = "weather";
        options = { address: isolateAddress(wordList).join() };
    }

    return { category, options };
};

module.exports = parseMessage;