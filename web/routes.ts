import { FastifyLoggerInstance } from "fastify"
import { FastifyInstance } from "fastify/types/instance"
import { Server, IncomingMessage, ServerResponse } from "http"
import { Register } from "./register"
import { UserRepoDb } from "../impl/repo/UserRepoDb"
import { Welcome } from "./welcome"


export class Routes {
  constructor(
    server: FastifyInstance<Server, 
    IncomingMessage, 
    ServerResponse, 
    FastifyLoggerInstance>
  ){
    const getClient = () => server.pg.connect()
    const getToken = (username: string, email: string) => server.jwt.sign({username:username, email:email})
    const userRepo = new UserRepoDb(getClient,getToken)

    //route setting
    new Register('/users'  , server, userRepo)
    new Welcome ('/welcome', server)
  }
}
