import Server from './server';
import { MongoDB } from './db';
import { httpConfig, mongoConfig } from './config';

const server = new Server();
const mongodb = new MongoDB();

(async() => {
  await mongodb.connect(mongoConfig);
  server.init(httpConfig);
})();

