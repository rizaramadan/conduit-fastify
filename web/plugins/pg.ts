/**
 * this declaration must be in scope of the typescript interpreter to work
 * this declaration is copied from index.d.ts of fastify-postgres
 */
import {PostgresDb} from 'fastify-postgres'

declare module 'fastify' {
  export interface FastifyInstance {
    pg: PostgresDb & Record<string, PostgresDb>;
  }
}

