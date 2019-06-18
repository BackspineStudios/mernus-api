'use strict';

import express from 'express';
import { Logger, Responder } from '../middleware';

export default class Router {

  constructor() {
    this.expressRouter = express.Router();
  }

  init(actions) {

    if (!actions) {
      throw new Error('server.router: no actions loaded');
    }

    const { expressRouter, middleware } = this;

    for (const i in actions) {
      const action = actions[i];
      if (action.active) {
        expressRouter[action.method](action.path, middleware, action.fn);
      }
    }

    expressRouter.all('/*', middleware, (req, res) => {
      const logger = new Logger(req);
      logger.logError(501, new Error('Invalid route'));
      res.status(501).send({
        message: 'Not implemented',
      });
    });

    return expressRouter;
  }

  middleware(req, res, next) {
    const logger = new Logger(req);
    res.responder = new Responder(req, res, logger);
    req.startTime = new Date();
    logger.logRequest();
    next();
  }
}
