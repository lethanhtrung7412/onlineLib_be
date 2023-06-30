import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUser1688021925836 implements MigrationInterface {
    name = 'AddRoleToUser1688021925836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "isAdmin" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "isAdmin"
        `);
    }

}
