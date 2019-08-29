import config from './config/config'
import Server from './server';

const server = new Server(config);
server.bootstrap();