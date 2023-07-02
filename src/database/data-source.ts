import "reflect-metadata";
import { Environment } from "../config/environment";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Book } from "./entities/Book";
import { Category } from "./entities/Category";
import { Vote } from "./entities/Vote";

Environment.setup();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 8080,
  username: process.env.DATABASE_USERNAME || "trung",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [User, Book, Category, Vote],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*.ts"],
});
