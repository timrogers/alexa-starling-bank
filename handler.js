/* eslint new-cap: ["error", { "newIsCapExceptions": ["intentHandler"] }]*/
const _ = require('lodash');
const Starling = require('starling-developer-sdk');

const Utils = require('./src/utils');
const balanceIntent = require('./src/balance-intent');
const todayIntent = require('./src/today-intent');
const yesterdayIntent = require('./src/yesterday-intent');
const fallbackIntent = require('./src/fallback-intent');

const INTENT_HANDLERS = {
  balance: balanceIntent,
  today: todayIntent,
  yesterday: yesterdayIntent,
};

module.exports.handler = (event, context, callback) => {
  const accessToken = process.env.STARLING_ACCESS_TOKEN;

  if (!accessToken) {
    const response = Utils.buildSpeechResponse('You haven\'t set a Starling access token. Set the environment variable as described in the readme, re-deploy, and then try again.');
    callback(null, response);
  }

  const client = new Starling({ accessToken });

  const intentHandler = _.get(INTENT_HANDLERS, _.get(event, 'request.intent.name'), fallbackIntent);
  const handler = new intentHandler(client);

  handler.handle(event, context, callback);
};
