const FallbackIntent = require('./fallback-intent');

describe('handle', () => {
  it('returns a valid Alexa response', () => {
    const handler = new FallbackIntent();
    const mockCallback = jest.fn().mockImplementation(() => {
      expect(mockCallback.mock.calls[0]).toMatchSnapshot();
    });

    handler.handle({}, {}, mockCallback);
  });
});

