# Starling Bank for Alexa

[![CircleCI](https://circleci.com/gh/timrogers/alexa-starling-bank.svg?style=svg)](https://circleci.com/gh/timrogers/alexa-starling-bank)

This Alexa skill, built with [Serverless](https://serverless.com) and easily deployable
to AWS Lambda, lets you access key details about your
[Starling Bank](https://www.starlingbank.com) bank account using your voice, from your
Amazon Echo, Echo Dot or other Alexa device.

## Setup

1. Install [Serverless](https://serverless.com) with `yarn global add serverless`.
2. Grab the skill's development and runtime dependencies by running `yarn`.
3. Set your Starling Bank personal access token as an environment variable,
`STARLING_ACCESS_TOKEN`. (This will be used on Lambda to authenticate with Starling
and access your account.)
4. Run `serverless deploy` to deploy the code to AWS Lambda. You'll be asked for your
AWS credentials the first time round.
5. Head to the [Lambda console](https://eu-west-1.console.aws.amazon.com/lambda/home),
click on your newly-created function, and then copy the ARN from the top-right hand
corner
(e.g. ` arn:aws:lambda:eu-west-1:223734088496:function:alexa-starling-bank-dev-handler`).
6. Head to the
[Alexa Skills Kit section](https://developer.amazon.com/edw/home.html#/skills) on the
Amazon Developer Console, then click "Add a New Skill".
7. Set the language to "English (U.K.)", choose a Name, and set the Invocation Name to
"Starling Bank", then click "Save".
8. For your Intent Schema, copy in the contents of 
[intent-schema.json](https://github.com/timrogers/alexa-starling-bank/blob/master/intent-schema.json),
then click "Next".
8. On the Configuration page, choose the Service Endpoint Type "Amazon Lambda ARN",
then choose your region, and then paste in the ARN you grabbed earlier, then click
"Save".
9. On the Test page, flick the switch to Enabled. You can now test the skill - head
to the Usage section below.
10. If you make changes to the code, run the tests with `yarn test`, then re-deploy
with `serverless deploy`. Your skill will be updated in place, and you'll be able to test
your changes immediately from Alexa. Some changes will require you to change the Intent
Schema on the Alexa developer portal - if you make changes there, don't forget to
recommit them in
[intent-schema.json](https://github.com/timrogers/alexa-starling-bank/blob/master/intent-schema.json)
if you're sharing your changes with the community.

## Usage

Using the Alexa skill, you can:

* __Get your balance__: Just say `Alexa, ask Starling Bank to tell me my balance`
* __Find out how much you spent yesterday__: Just say `Alexa, ask Starling Bank how much I spent yesterday`
* __Find out how much you've spent today__: Just say `Alexa, ask Starling Bank how much I've spent today`

## Testing

This skill is tested using [Jest](https://facebook.github.io/jest/), and the code style
is kept in conformance with
[Airbnb's JavaScript style guide](https://github.com/airbnb/javascript) using 
[ESLint](http://eslint.org/). Both of these
tools are run automatically as part of the CI (continuous integration) process in
CircleCI.

* To run the tests: `yarn test`
* To check (and auto-correct) your code style: `yarn lint`

## Contributing

All contributions are welcome - just make a pull request, making sure you include tests,
and write a good, informative commit message/pull request body.

Check out
[CODE_OF_CONDUCT.md](https://github.com/timrogers/alexa-starling-bank/blob/master/CODE_OF_CONDUCT.md)
to learn about how we can best work together as an open source community to make this
Alexa skill as good as it can be.
