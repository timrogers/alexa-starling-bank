/* eslint new-cap: ["error", { "newIsCapExceptions": ["intentHandlerClass"] }]*/
const _ = require('lodash');
const Starling = require('starling-developer-sdk');

const Utils = require('./src/utils');
const BalanceIntentHandler = require('./src/balance-intent-handler');
const TodayIntentHandler = require('./src/today-intent-handler');
const YesterdayIntentHandler = require('./src/yesterday-intent-handler');
const FallbackIntentHandler = require('./src/fallback-intent-handler');

const INTENT_HANDLERS = {
  balance: BalanceIntentHandler,
  today: TodayIntentHandler,
  yesterday: YesterdayIntentHandler,
};

module.exports.handle = (event, context, callback) => {
  const accessToken = process.env.STARLING_ACCESS_TOKEN;

  if (!accessToken) {
    const response = Utils.buildSpeechResponse('You haven\'t set a Starling access token. Set the environment variable as described in the readme, re-deploy, and then try again.');
    callback(null, response);
  } else {
    const client = new Starling({ accessToken });

    const intentHandlerClass = _.get(INTENT_HANDLERS, _.get(event, 'request.intent.name'), FallbackIntentHandler);
    const handler = new intentHandlerClass(client);

    handler.handle(event, context, callback);
  }
};
