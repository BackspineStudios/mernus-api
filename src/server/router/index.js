'use strict';

import express from 'express';
import { Logger, Responder } from '../middleware';
import * as actions from '../../actions';

export default class Router {

  constructor() {
    this.router = express.Router();
  }

  init() {

    const { router, middleware } = this;

    for (const i in actions) {
      const action = actions[i];
      if (action.active) {
        router[action.method](action.path, middleware, action.fn);
      }
    }

    router.all('/*', middleware, (req, res) => {
      const logger = new Logger(req);
      logger.logError(501, new Error('Invalid route'));
      res.status(501).send({
        message: 'Not implemented',
      });
    });

    return router;
  }

  middleware(req, res, next) {
    const logger = new Logger(req);
    res.responder = new Responder(req, res, logger);
    req.startTime = new Date();
    logger.logRequest();
    next();
  }
}
