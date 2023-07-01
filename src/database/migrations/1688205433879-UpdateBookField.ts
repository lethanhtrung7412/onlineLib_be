import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookField1688205433879 implements MigrationInterface {
    name = 'UpdateBookField1688205433879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_683d2160f6f492038412ba6b3b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
                RENAME COLUMN "categoriesId" TO "categoryId"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_a0f13454de3df36e337e01dbd55" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_a0f13454de3df36e337e01dbd55"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
                RENAME COLUMN "categoryId" TO "categoriesId"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_683d2160f6f492038412ba6b3b8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
