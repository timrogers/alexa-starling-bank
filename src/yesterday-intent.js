const _ = require('lodash');
const moment = require('moment-timezone');
const Utils = require('./utils');

class YesterdayIntent {
  constructor(client) {
    this.client = client;
  }

  handle(event, context, callback) {
    const twoDaysAgo = moment.tz('Europe/London').subtract(2, 'days').format('YYYY-MM-DD');
    const yesterday = moment.tz('Europe/London').subtract(1, 'day').format('YYYY-MM-DD');

    this.client.getTransactions(undefined, twoDaysAgo, yesterday)
      .then(({ data }) => {
        const transactions = _.get(data, '_embedded.transactions');
        const debitTransactions = _.filter(transactions, transaction => transaction.amount < 0);

        if (debitTransactions.length >= 1) {
          const amount = _.sumBy(debitTransactions, transaction => transaction.amount);
          const response = Utils.buildSpeechResponse(`You spent £${Math.abs(amount)} yesterday.`);
          callback(null, response);
        } else {
          const response = Utils.buildSpeechResponse('You didn\'t spend anything yesterday.');
          callback(null, response);
        }
      })
      .catch(() => {
        const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
        callback(null, response);
      });
  }
}

module.exports = YesterdayIntent;
