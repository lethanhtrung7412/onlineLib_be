import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

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

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
}