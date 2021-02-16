import * as jwt from 'jsonwebtoken'
import {JWT, SignPayloadType, VerifyPayloadType, VerifyCallback, UserType} from 'fastify-jwt'

/**
 * this declaration must be in scope of the typescript interpreter to work
 * this declaration is copied from index.d.ts of fastify-jwt
 */
declare module 'fastify' {
  interface FastifyInstance {
    jwt: JWT
  }

  interface FastifyReply {
    jwtSign(payload: SignPayloadType, options?: jwt.SignOptions): Promise<string>
    jwtSign(payload: SignPayloadType, callback: jwt.SignCallback): void
    jwtSign(payload: SignPayloadType, options: jwt.SignOptions, callback: jwt.SignCallback): void
  }

  interface FastifyRequest {
    jwtVerify<Decoded extends VerifyPayloadType>(options?: jwt.VerifyOptions): Promise<Decoded>
    jwtVerify<Decoded extends VerifyPayloadType>(callback: VerifyCallback<Decoded>): void
    jwtVerify<Decoded extends VerifyPayloadType>(options: jwt.VerifyOptions, callback: VerifyCallback<Decoded>): void
    user: UserType
  }
} 

/**
 * this is for specifying payload structure
 */
declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { username: string; email: string }
  }
}
