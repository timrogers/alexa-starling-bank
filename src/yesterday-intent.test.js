const MockDate = require('mockdate');

const YesterdayIntent = require('./yesterday-intent');
const transactionsResponse = require('./transactions.fixture.json');

describe('handle', () => {
  beforeEach(() => {
    MockDate.set('06/10/2017');
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('getting transactions from Starling successfully', () => {
    it('returns a valid Alexa response, adding together the debit transactions', () => {
      const client = {
        getTransactions: jest.fn(() => Promise.resolve({ data: transactionsResponse })),
      };

      const handler = new YesterdayIntent(client);

      const mockCallback = jest.fn().mockImplementation((_, response) => {
        expect(client.getTransactions).toHaveBeenCalledWith(undefined, '2017-06-08', '2017-06-09');
        expect(response).toMatchSnapshot();
      });

      handler.handle({}, {}, mockCallback);
    });
  });

  describe('failing to get transactions from Starling', () => {
    it('returns a valid Alexa response', () => {
      const client = {
        getTransactions: jest.fn(() => Promise.reject()),
      };

      const handler = new YesterdayIntent(client);
      const mockCallback = jest.fn().mockImplementation((_, response) => {
        expect(client.getTransactions).toHaveBeenCalledWith(undefined, '2017-06-08', '2017-06-09');
        expect(response).toMatchSnapshot();
      });

      handler.handle({}, {}, mockCallback);
    });
  });
});

