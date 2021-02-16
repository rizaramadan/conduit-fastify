import { FastifyLoggerInstance } from "fastify"
import { FastifyInstance } from "fastify/types/instance"
import { Server, IncomingMessage, ServerResponse } from "http"
import { Register } from "./register"
import { UserRepoDb } from "../../impl/repo/user_repo_db"
import { Welcome } from "./welcome"

export class Routes {
  constructor(
    server: 
      FastifyInstance<
        Server, 
        IncomingMessage, 
        ServerResponse, 
        FastifyLoggerInstance
      >
  ){
    //encapsulate how to get pgclient
    const getClient = () => server.pg.connect()
    //encapsulate how to get jwt token from username and email
    const getToken = (username: string, email: string) => server.jwt.sign({username:username, email:email})
    
    //instantiate routes dependencies
    const userRepo = new UserRepoDb(getClient)

    //route setting
    new Register('/users'  , server, getToken, userRepo)
    new Welcome ('/welcome', server)
  }
}
