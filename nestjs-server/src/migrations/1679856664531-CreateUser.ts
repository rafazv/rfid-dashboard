import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1679856664531 implements MigrationInterface {
    name = 'CreateUser1679856664531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "aptoNumber" character varying(3) NOT NULL, "rfid" character varying(100) NOT NULL, "disabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa857b28b73a25ddc900d854df8" UNIQUE ("rfid"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
