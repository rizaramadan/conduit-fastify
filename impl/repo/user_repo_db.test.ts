import { expect } from "chai"
import { PoolClient, QueryResult } from "pg"
import { UserRepoDb } from "./user_repo_db"
import {IUser} from "../../users/entity"
import * as moq from "typemoq"

describe("user create repo", () => {
  it("should pass", async () => {
    const user : IUser = { username: "", email:"", password:"", bio:null, image:null, token:null }
    const queryResult: QueryResult<IUser> = {
      rows    : [user],
      rowCount: 1,
      command : "",
      oid     : 0,
      fields  : []
    }
    const mockedPool: moq.IMock<PoolClient> = moq.Mock.ofType<PoolClient>()
    mockedPool.setup(x => x.query<IUser>(moq.It.isAnyString(), moq.It.isAny()))
              .returns( async () => Promise.resolve(queryResult))
    mockedPool.setup(x => x.release())
              .returns(() => {})

    const getClient: () => Promise<PoolClient> = () => Promise.resolve(mockedPool.object)
    const userRepo = new UserRepoDb(getClient)

    //if await uncommented, it will wait forever...
    const result = /*await*/ userRepo.create(user)

    //currently fail, the resut is "{}", not match with 'true'
    expect(result).to.equal(true)
  })
})
