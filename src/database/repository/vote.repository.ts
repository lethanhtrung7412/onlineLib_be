import { DeleteResult, Repository } from "typeorm";
import { PostgresDataSource } from "../data-source";
import { Vote } from "../entities/Vote";
import IVoteRepository from "./interface/ivote.repository";

class VoteRepository implements IVoteRepository {
    repo: Repository<Vote>;

    constructor() {
        this.repo = PostgresDataSource.getRepository(Vote);
    }

    create(data: Vote): Promise<Vote> {
        return this.repo.save(data);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repo.delete(id);
    }
}