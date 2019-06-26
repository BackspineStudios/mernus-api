import { Responder, Logger } from '../../../src/server/middleware';
import { express } from '../../mocks';

describe('Server.Middleware.Responder', () => {

  const logger = new Logger(express.req);

  it('should append req, res and logger to self', () => {
    const responder = new Responder(express.req, express.res, logger);

    expect(responder).toEqual({ request: express.req, response: express.res, logger });
  });

  it('ok() should respond 200 with data as result', () => {
    const responder = new Responder(express.req, express.res, logger);
    logger.logSuccess = jest.fn();
    express.res.status = jest.fn((status) => status);
    express.res.json = jest.fn((data) => data);

    responder.ok('message');
    expect(logger.logSuccess).toHaveBeenCalled();
    expect(express.res.status).toHaveReturnedWith(200);
    expect(express.res.json).toHaveReturnedWith({ result: 'message' });
  });

  it('ok() should respond 200 with null as result when called without data', () => {
    const responder = new Responder(express.req, express.res, logger);
    logger.logSuccess = jest.fn();
    express.res.status = jest.fn((status) => status);
    express.res.json = jest.fn((data) => data);

    responder.ok();
    expect(logger.logSuccess).toHaveBeenCalled();
    expect(express.res.status).toHaveReturnedWith(200);
    expect(express.res.json).toHaveReturnedWith({ result: null });
  });

  it('error() should respond error code & message', () => {
    const responder = new Responder(express.req, express.res, logger);
    logger.logError = jest.fn();
    express.res.status = jest.fn((status) => status);
    express.res.json = jest.fn((data) => data);

    responder.error(404, new Error('Not Found'));
    expect(logger.logError).toHaveBeenCalled();
    expect(express.res.status).toHaveReturnedWith(404);
    expect(express.res.json).toHaveReturnedWith({ error: "Not Found" });
  });

  it('error() should respond 500 by default', () => {
    const responder = new Responder(express.req, express.res, logger);
    logger.logError = jest.fn();
    express.res.status = jest.fn((status) => status);
    express.res.json = jest.fn((data) => data);

    responder.error();
    expect(logger.logError).toHaveBeenCalled();
    expect(express.res.status).toHaveReturnedWith(500);
    expect(express.res.json).toHaveReturnedWith({ error: '' });
  });

});
