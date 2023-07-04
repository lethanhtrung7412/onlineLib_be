import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikeTable1688434831668 implements MigrationInterface {
    name = 'CreateLikeTable1688434831668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "likes" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                "book_id" integer,
                CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_3b6c579d5149ccacfad0f5f5cd6" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3b6c579d5149ccacfad0f5f5cd6"
        `);
        await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"
        `);
        await queryRunner.query(`
            DROP TABLE "likes"
        `);
    }

}
