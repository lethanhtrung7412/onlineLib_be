import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookAndCategoryTable1688085682409 implements MigrationInterface {
    name = 'CreateBookAndCategoryTable1688085682409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying,
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying,
                "description" character varying,
                "publishedDate" date,
                "author" character varying,
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "books_categories_categories" (
                "booksId" integer NOT NULL,
                "categoriesId" integer NOT NULL,
                CONSTRAINT "PK_9430da01f61a125949bf1a953bb" PRIMARY KEY ("booksId", "categoriesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ced442e7d00e4c0a567c921cc1" ON "books_categories_categories" ("booksId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_827e33c7667b4b73d4ca699415" ON "books_categories_categories" ("categoriesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "books_categories_categories"
            ADD CONSTRAINT "FK_ced442e7d00e4c0a567c921cc14" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "books_categories_categories"
            ADD CONSTRAINT "FK_827e33c7667b4b73d4ca6994151" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books_categories_categories" DROP CONSTRAINT "FK_827e33c7667b4b73d4ca6994151"
        `);
        await queryRunner.query(`
            ALTER TABLE "books_categories_categories" DROP CONSTRAINT "FK_ced442e7d00e4c0a567c921cc14"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_827e33c7667b4b73d4ca699415"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ced442e7d00e4c0a567c921cc1"
        `);
        await queryRunner.query(`
            DROP TABLE "books_categories_categories"
        `);
        await queryRunner.query(`
            DROP TABLE "books"
        `);
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
    }

}
