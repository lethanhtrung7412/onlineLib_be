import { DeleteResult, UpdateResult } from "typeorm"
import { Book } from "../../../database/entities/Book"

export interface IBookHandler {
  getAllBook(): Promise<Book[]>
  getBookById(id: number): Promise<Book>
  create(data: Book): Promise<Book> 
  update(id: number, data: Book): Promise<UpdateResult> 
  delete(id: number): Promise<DeleteResult>
}