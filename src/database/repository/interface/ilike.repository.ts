import { DeleteResult } from "typeorm";
import { Like } from "../../entities/Like";

export default interface ILikeRepository {
    create(data: Like): Promise<Like>
    delete(id: number): Promise<DeleteResult>
}