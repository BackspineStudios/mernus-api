import Server from './server';
import { httpConfig } from './config';

const server = new Server();
server.init(httpConfig);
