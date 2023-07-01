import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBookAndCategoryRelation1688205165624 implements MigrationInterface {
    name = 'ChangeBookAndCategoryRelation1688205165624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD "categoriesId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_683d2160f6f492038412ba6b3b8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_683d2160f6f492038412ba6b3b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "books" DROP COLUMN "categoriesId"
        `);
    }

}
