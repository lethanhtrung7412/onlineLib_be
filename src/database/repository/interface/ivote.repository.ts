import { DeleteResult } from "typeorm";
import { Vote } from "../../entities/Vote";

export default interface IVoteRepository {
    create(data: Vote): Promise<Vote>
    delete(id: number): Promise<DeleteResult>
}