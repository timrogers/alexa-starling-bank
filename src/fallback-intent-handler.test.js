const FallbackIntentHandler = require('./fallback-intent-handler');

describe('handle', () => {
  it('returns a valid Alexa response', () => {
    const handler = new FallbackIntentHandler();
    const mockCallback = jest.fn().mockImplementation(() => {
      expect(mockCallback.mock.calls[0]).toMatchSnapshot();
    });

    handler.handle({}, {}, mockCallback);
  });
});

