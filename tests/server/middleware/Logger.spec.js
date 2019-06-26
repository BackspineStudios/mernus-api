import { Logger } from '../../../src/server/middleware';
import { express } from '../../mocks';

describe('Server.Middleware.Logger', () => {

  it('should append request to self', () => {
    const logger = new Logger(express.req);

    expect(logger).toHaveProperty('request');
    expect(logger.request).toEqual(express.req);
  });

  it('should log requests', () => {
    const logger = new Logger(express.req);
    console.info = jest.fn();

    logger.logRequest();
    expect(console.info).toHaveBeenCalled();
  });

  it('should log success', () => {
    const logger = new Logger(express.req);
    console.info = jest.fn();

    logger.logSuccess();
    expect(console.info).toHaveBeenCalled();
  });

  it('should log errors', () => {
    const logger = new Logger(express.req);
    console.error = jest.fn();

    logger.logError(500, new Error());
    expect(console.error).toHaveBeenCalled();
  });

  it('should throw if logError its called with invalid params', () => {
    const logger = new Logger(express.req);

    expect(() => {
      logger.logError();
    }).toThrow('Logger.logError: invalid parameters');
  });

});
