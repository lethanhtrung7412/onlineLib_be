import {Column, Entity} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "categories"})
export class Category extends BaseEntity{
    @Column({default: null})
    name: string
}