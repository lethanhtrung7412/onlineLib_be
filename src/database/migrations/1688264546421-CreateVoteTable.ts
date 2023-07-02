import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVoteTable1688264546421 implements MigrationInterface {
    name = 'CreateVoteTable1688264546421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "votes" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                "book_id" integer,
                CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "votes"
            ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "votes"
            ADD CONSTRAINT "FK_00d1a6d1649d50424713eaa4e45" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "votes" DROP CONSTRAINT "FK_00d1a6d1649d50424713eaa4e45"
        `);
        await queryRunner.query(`
            ALTER TABLE "votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"
        `);
        await queryRunner.query(`
            DROP TABLE "votes"
        `);
    }

}
