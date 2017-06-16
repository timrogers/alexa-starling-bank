const _ = require('lodash');
const Utils = require('./utils');

class TransactionsTotalIntent {
  constructor(client) {
    this.client = client;
  }

  handle(event, context, callback) {
    this.client
      .getTransactions(undefined, this.constructor.getFromDate(), this.constructor.getToDate())
      .then(({ data }) => {
        const transactions = _.get(data, '_embedded.transactions');

        const debitTransactions = _.filter(transactions, transaction => transaction.amount < 0);

        if (debitTransactions.length >= 1) {
          const amount = _.sumBy(debitTransactions, transaction => transaction.amount);
          const message = this.constructor.generateMessageWithAmount(Math.abs(amount));
          const response = Utils.buildSpeechResponse(message);
          callback(null, response);
        } else {
          const message = this.constructor.generateMessageWithNoTransactions();
          const response = Utils.buildSpeechResponse(message);
          callback(null, response);
        }
      })
      .catch(() => {
        const response = Utils.buildSpeechResponse('Something went wrong. Check your Starling access token, re-deploy, and then try again');
        callback(null, response);
      });
  }

  static getFromDate() {
    throw new Error('getFromDate() must be implemented by a subclass of TransactionsTotalIntent');
  }

  static getToDate() {
    throw new Error('getFromDate() must be implemented by a subclass of TransactionsTotalIntent');
  }

  static generateMessageWithAmount() {
    throw new Error('generateMessageWithAmount() must be implemented by a subclass of TransactionsTotalIntent');
  }

  static generateMessageWithNoTransactions() {
    throw new Error('generateMessageWithNoTransactions() must be implemented by a subclass of TransactionsTotalIntent');
  }
}

module.exports = TransactionsTotalIntent;
