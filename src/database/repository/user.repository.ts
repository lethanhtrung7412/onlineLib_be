import { Repository } from "typeorm";

import { IUserRepository } from "./interface/iuser.repository";
import { User, TypeAuth } from "../entities/User";
import { PostgresDataSource } from "../data-source";

class UserRepository implements IUserRepository {
  repo: Repository<User>;

  constructor() {
    this.repo = PostgresDataSource.getRepository(User);
  }

  getByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where: { email },
    });
  }

  getById(id: number): Promise<User> {
      return this.repo.findOne({
        where: {id}
      })
  }

  create(data: User): Promise<User> {
      return this.repo.save(data)
  }

  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
      return this.repo.findOne({
        where: {
            typeAuth,
            email
        }
      })
  }

  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
      return this.repo.findOne({
        where: {
            typeAuth,
            googleId
        }
      })
  }
}
