const _ = require('lodash');
const moment = require('moment-timezone');
const Utils = require('./utils');

class TodayIntent {
  constructor(client) {
    this.client = client;
  }

  handle(event, context, callback) {
    const yesterday = moment.tz('Europe/London').subtract(1, 'day').format('YYYY-MM-DD');
    const today = moment.tz('Europe/London').format('YYYY-MM-DD');

    this.client.getTransactions(undefined, yesterday, today)
      .then(({ data }) => {
        const transactions = _.get(data, '_embedded.transactions');

        const debitTransactions = _.filter(transactions, transaction => transaction.amount < 0);

        if (debitTransactions.length >= 1) {
          const amount = _.sumBy(debitTransactions, transaction => transaction.amount);
          const response = Utils.buildSpeechResponse(`You've spent £${Math.abs(amount)} today.`);
          callback(null, response);
        } else {
          const response = Utils.buildSpeechResponse('You haven\'t spent anything today.');
          callback(null, response);
        }
      })
      .catch(() => {
        const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
        callback(null, response);
      });
  }
}

module.exports = TodayIntent;
