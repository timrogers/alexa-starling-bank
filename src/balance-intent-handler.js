const Utils = require('./utils');

class BalanceIntentHandler {
  constructor(client) {
    this.client = client;
  }

  handle(event, context, callback) {
    this.client.getBalance()
      .then(({ data }) => {
        const response = Utils.buildSpeechResponse(`Your balance is £${data.amount}.`);
        callback(null, response);
      })
      .catch(() => {
        const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
        callback(null, response);
      });
  }
}

module.exports = BalanceIntentHandler;
