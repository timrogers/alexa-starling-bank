const lodash = require('lodash');

const handler = require('./handler');

describe('handle', () => {
  describe('with STARLING_ACCESS_TOKEN set', () => {
    // TODO: Add an integration test
  });

  describe('with no STARLING_ACCESS_TOKEN set', () => {
    const originalEnv = lodash.cloneDeep(process.env);

    beforeEach(() => {
      delete process.env.STARLING_ACCESS_TOKEN;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('returns a valid Alexa response telling you to set the token', () => {
      const mockCallback = jest.fn().mockImplementation((_, response) => {
        expect(response).toMatchSnapshot();
      });

      handler.handle({}, {}, mockCallback);
    });
  });
});

