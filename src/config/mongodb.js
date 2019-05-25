'use strict';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_AUTH,
} = process.env;

export const mongoConfig = {
  HOST: DB_HOST || '127.0.0.1',
  PORT: DB_PORT || '27017',
  NAME: DB_NAME || 'mernus',
  USER: DB_USER || null,
  PASSWORD: DB_PASSWORD || null,
  AUTH: DB_AUTH || 'admin',
  OPTS: {
    autoReconnect: true,
    poolSize: 15,
    keepAlive: 1,
    promiseLibrary: Promise,
    useNewUrlParser: true,
    ssl: false,
    sslValidate: false,
    /* File Buffers */
    sslCA: null,
    sslKey: null,
    sslCert: null,
  }
};
