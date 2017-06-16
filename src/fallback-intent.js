/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handle"] }] */
const Utils = require('./utils');

class FallbackIntent {
  handle(event, context, callback) {
    const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
    callback(null, response);
  }
}

module.exports = FallbackIntent;

