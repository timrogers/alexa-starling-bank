const Utils = require('./utils');

describe('buildSpeechResponse', () => {
  it('returns a valid Alexa response', () => {
    expect(Utils.buildSpeechResponse('Hello!')).toMatchSnapshot();
  });

  describe('setting shouldEndSession', () => {
    it('returns a valid Alexa response', () => {
      expect(Utils.buildSpeechResponse('Hello!', false)).toMatchSnapshot();
    });
  });
});

