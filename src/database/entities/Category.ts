import {Column, Entity, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity({name: "categories"})
export class Category extends BaseEntity{
    @Column({default: null})
    name: string

    @OneToMany(()=> Book, (book) => book.category)
    books: Book[]
}