const BalanceIntent = require('./balance-intent');

describe('handle', () => {
  describe('getting a balance from Starling successfully', () => {
    it('returns a valid Alexa response', () => {
      const client = {
        getBalance: jest.fn(() => Promise.resolve({ data: { amount: 1000 } })),
      };

      const handler = new BalanceIntent(client);

      const mockCallback = jest.fn().mockImplementation((_, response) => {
        expect(client.getBalance).toHaveBeenCalled();
        expect(response).toMatchSnapshot();
      });

      handler.handle({}, {}, mockCallback);
    });
  });

  describe('failing to get a balance from Starling', () => {
    it('returns a valid Alexa response', () => {
      const client = {
        getBalance: jest.fn(() => Promise.reject()),
      };

      const handler = new BalanceIntent(client);
      const mockCallback = jest.fn().mockImplementation((_, response) => {
        expect(client.getBalance).toHaveBeenCalled();
        expect(response).toMatchSnapshot();
      });

      handler.handle({}, {}, mockCallback);
    });
  });
});

