import { MigrationInterface, QueryRunner } from 'typeorm';

export class DashboardTable1683389193212 implements MigrationInterface {
  name = 'DashboardTable1683389193212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dashboard" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_233ed28fa3a1f9fbe743f571f75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dashboard" ADD CONSTRAINT "FK_82db5beffb6dfcedcb2c4235f45" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dashboard" DROP CONSTRAINT "FK_82db5beffb6dfcedcb2c4235f45"`,
    );
    await queryRunner.query(`DROP TABLE "dashboard"`);
  }
}
