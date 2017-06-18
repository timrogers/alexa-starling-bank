/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handle"] }] */
const Utils = require('./utils');

class FallbackIntentHandler {
  handle(event, context, callback) {
    const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
    callback(null, response);
  }
}

module.exports = FallbackIntentHandler;

