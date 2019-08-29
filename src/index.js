import config from './config/config'
import Server from './server';
import "core-js/stable";
import "regenerator-runtime/runtime";


const server = new Server(config);
server.bootstrap();