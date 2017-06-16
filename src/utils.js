

const buildSpeechResponse = (text, shouldEndSession = true) => ({
  version: '1.0',
  response: {
    outputSpeech: {
      type: 'PlainText',
      text,
    },
    shouldEndSession,
  },
});

module.exports = { buildSpeechResponse };
