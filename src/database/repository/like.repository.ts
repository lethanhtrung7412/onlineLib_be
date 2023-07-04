import { DeleteResult, Repository } from "typeorm";
import { PostgresDataSource } from "../data-source";
import { Like } from "../entities/Like";
import ILikeRepository from "./interface/ilike.repository";

class LikeRepository implements ILikeRepository {
    repo: Repository<Like>;

    constructor() {
        this.repo = PostgresDataSource.getRepository(Like);
    }

    create(data: Like): Promise<Like> {
        return this.repo.save(data);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repo.delete(id);
    }
}

export default new LikeRepository();