import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Like} from "./Like";

export enum TypeAuth {
    LOCAL = "local",
    GOOGLE = "google"
}

@Entity({name: "users"})
export class User extends BaseEntity {
    @Column({default: null})
    name: string;

    @Column({default: null})
    birthDate: string

    @Column({default: null})
    email: string;

    @Column({default: null})
    password: string

    @Column({default: false, name: 'is_admin'})
    isAdmin: boolean

    @Column({
        type: "enum",
        name: "type_auth",
        enum: TypeAuth,
        default: TypeAuth.LOCAL
    })
    typeAuth: TypeAuth
    
    @Column({default: null, name:"google_id"})
    googleId: string

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]
}