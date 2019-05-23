'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import Router from './router';

export default class Server {

  constructor() {
    this.app = express();
  }

  init(config) {

    const { app } = this;

    // to support JSON-encoded bodies
    app.use(bodyParser.json());

    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    // Load http router
    const router = new Router();
    app.use(router.init());

    // Launch server by doing app listen on config.port
    return app.listen(config.port, () => {
      console.log('Express server listening on port:', config.port);
    });
  }
}
