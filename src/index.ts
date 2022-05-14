import { Server } from './shared/infra/http/server';

const server = new Server();

function execute() {
  server.start();
}

execute();
