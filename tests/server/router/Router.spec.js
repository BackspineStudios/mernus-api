import express from 'express';
import Router from '../../../src/server/router';
import { action } from '../../mocks';

describe('Server.Router', () => {

  it('should append express router on constructor', () => {
    const router = new Router();

    expect(router.expressRouter).not.toBe(undefined);
    expect(router.expressRouter.toString() === express.Router().toString()).toBe(true);
  });

  it('should throw an exception if init had been called without actions', () => {
    const router = new Router();

    expect(() => {
      router.init();
    }).toThrow('server.router: no actions loaded');
  });

  it('should load "not implemented" default action on init', () => {
    const router = new Router();
    const actions = [];
    const { stack } = router.init(actions);

    expect(stack).not.toBe(undefined);
    expect(stack).toHaveLength(1);
  });

  it('should ignore inactive actions on init', () => {
    const router = new Router();
    const actions = [{ active: false }];
    const { stack } = router.init(actions);

    expect(stack).not.toBe(undefined);
    expect(stack).toHaveLength(1);
  });

  it('should load active actions on init', () => {
    const router = new Router();
    const actions = [action];
    const { stack } = router.init(actions);

    expect(stack).not.toBe(undefined);
    expect(stack).toHaveLength(2);
  });

  it('should return express router on init', () => {
    const router = new Router();
    const actions = [];

    const expressRouter = router.init(actions);

    expect(expressRouter).not.toBe(undefined);
    expect(expressRouter.toString() === express.Router().toString()).toBe(true);
  });

  it('middleware should append responder and startTime and log request', () => {
    const router = new Router();
    const mock = {
      req: {},
      res: {},
      next: jest.fn(),
    };

    console.info = jest.fn();
    router.middleware(...Object.values(mock));

    expect(mock.res).toHaveProperty('responder');
    expect(mock.req).toHaveProperty('startTime');
    expect(mock.next).toHaveBeenCalled();
    expect(console.info).toHaveBeenCalled();
  });

});
