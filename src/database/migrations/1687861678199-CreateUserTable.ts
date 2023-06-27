import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1687861678199 implements MigrationInterface {
    name = 'CreateUserTable1687861678199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_type_auth_enum" AS ENUM('local', 'google')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying,
                "birthDate" character varying,
                "email" character varying,
                "password" character varying,
                "type_auth" "public"."users_type_auth_enum" NOT NULL DEFAULT 'local',
                "google_id" character varying,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_type_auth_enum"
        `);
    }

}
