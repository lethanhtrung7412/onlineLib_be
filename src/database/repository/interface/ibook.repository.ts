import { DeleteResult, UpdateResult } from "typeorm";
import { Book } from "../../entities/Book";

export default interface IBookRepository {
    getAllBook(): Promise<Book[]>,
    getBookById(id: number): Promise<Book>,
    create(data: Book): Promise<Book>,
    update(id: number, data: Book): Promise<UpdateResult>,
    delete(id: number): Promise<DeleteResult>
}