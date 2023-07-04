import { DeleteResult } from "typeorm";
import { Like } from "../../../database/entities/Like";

export interface ILikeHandler {
    create(data: Like): Promise<Like>
    delete(id: number): Promise<DeleteResult>
}