import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserField1688089816226 implements MigrationInterface {
    name = 'UpdateUserField1688089816226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "isAdmin" TO "is_admin"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "is_admin" TO "isAdmin"
        `);
    }

}
