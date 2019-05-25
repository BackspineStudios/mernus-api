'use strict';

import mongoose from 'mongoose';
import * as loaders from './models';

let instance;

export class MongoDB {

  constructor() {

    if (!instance) {
      instance = this;
    }

    this.models = {};
    this.database = null;

    return instance;
  }

  async connect({ HOST, PORT, NAME, USER, PASSWORD, AUTH, OPTS }) {

    const endpoint =
      `mongodb://` +
      `${USER && PASSWORD ? `${encodeURI(USER)}:${encodeURIComponent(PASSWORD)}@` : ''}` +
      `${HOST}:${PORT}/${NAME}?authSource=${AUTH}`;
    const connection = mongoose.createConnection(endpoint, OPTS);

    try {
      this.database = await connection;
      this.loadModels(this.database);
      console.info(`MongoDB: succesfuly connected to [${NAME}] at [${HOST}:${PORT}]`);
    } catch (ex) {
      console.error(`MongoDB: unable to connect to [${NAME}] at [${HOST}:${PORT}]`, ex.message);
    }
  }

  loadModels(database) {
    for (const model in loaders) {
      const loadModel = loaders[model];
      if (typeof loadModel === 'function') {

        this.models[model] = loadModel(database);
      }
    }
  }
}
