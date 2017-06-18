const moment = require('moment-timezone');

const TransactionsTotalIntentHandler = require('./transactions-total-intent-handler');

class YesterdayIntentHandler extends TransactionsTotalIntentHandler {
  static getFromDate() {
    return moment.tz('Europe/London').subtract(2, 'days').format('YYYY-MM-DD');
  }

  static getToDate() {
    return moment.tz('Europe/London').subtract(1, 'day').format('YYYY-MM-DD');
  }

  static generateMessageWithAmount(amount) {
    return `You spent £${amount} yesterday.`;
  }

  static generateMessageWithNoTransactions() {
    return 'You didn\'t spend anything yesterday.';
  }
}

module.exports = YesterdayIntentHandler;
