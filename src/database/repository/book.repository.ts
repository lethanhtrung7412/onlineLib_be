import { DeleteResult, Repository, UpdateResult } from "typeorm";
import IBookRepository from "./interface/ibook.repository";
import { Book } from "../entities/Book";
import { PostgresDataSource } from "../data-source";

class BookRepository implements IBookRepository {
  repo: Repository<Book>;

  constructor() {
    this.repo = PostgresDataSource.getRepository(Book);
  }

  getAllBook(): Promise<Book[]> {
    return this.repo
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.category", "category")
      .leftJoin("book.likes", "like")
      .loadRelationCountAndMap("book.likeCount", "book.likes")
      .getMany();
  }

  getBookById(id: number): Promise<Book> {
    return this.repo.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  create(data: Book): Promise<Book> {
    return this.repo.save(data);
  }

  update(id: number, data: Book): Promise<UpdateResult> {
    return this.repo.update(id, {
      ...data,
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}

export default new BookRepository();
