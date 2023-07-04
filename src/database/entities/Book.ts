import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import {Like} from "./Like";

@Entity({name: "books"})
export class Book extends BaseEntity {
    @Column({default: null})
    title: string

    @Column({default: null})
    description: string

    @Column({default: null, name: "publishedDate", type:"date"})
    publishedDate: string

    @Column({default: null})
    author: string

    @ManyToOne(() => Category, (category) => category.books, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    category: Category

    @OneToMany(() => Like, (like) => like.book)
    likes: Like[]
}