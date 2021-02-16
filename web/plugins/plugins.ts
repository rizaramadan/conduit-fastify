import { FastifyLoggerInstance } from "fastify"
import { FastifyInstance } from "fastify/types/instance"
import { Server, IncomingMessage, ServerResponse } from "http"

export class Plugins {
  constructor(server: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>){
    registerFastifyPostgre(server)
    registerFastifyJwt(server)
  }
}
function registerFastifyPostgre(server: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>) {
  /**
 * initiate pg plugin for fastify
 */
  server.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mainmain@localhost:5432/gonduit',
  });
}

function registerFastifyJwt(server: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>) {
  /**
 * initialize jwt plugin for fastify
 */
  server.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })
}
