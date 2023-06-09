import "reflect-metadata";
import { Environment } from "../config/environment";
import { DataSource, Like } from "typeorm";
import { User } from "./entities/User";
import { Book } from "./entities/Book";
import { Category } from "./entities/Category";
import { Like as LikeEntity } from "./entities/Like";

Environment.setup();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 8080,
  username: process.env.DATABASE_USERNAME || "trung",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [User, Book, Category, LikeEntity],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*.ts"],
});
