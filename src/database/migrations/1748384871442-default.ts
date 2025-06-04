import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748384871442 implements MigrationInterface {
    name = 'Default1748384871442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" BIGSERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissoes" ("id" BIGSERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a83561e7be8610760090b45c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" BIGSERIAL NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "email" text NOT NULL, "senha" character varying NOT NULL, "usuario_atualizador" text, "usuario_cadastrador" text, "ultimo_login" TIMESTAMP, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissoes" ("role_id" bigint NOT NULL, "permissao_id" bigint NOT NULL, CONSTRAINT "PK_5462c3cb6092673295830987efa" PRIMARY KEY ("role_id", "permissao_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_52f0c89db985effd01e6f2cc53" ON "roles_permissoes" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_45ff8f6ce0e9a2342b05b1f64b" ON "roles_permissoes" ("permissao_id") `);
        await queryRunner.query(`CREATE TABLE "usuarios_permissoes" ("usuario_id" bigint NOT NULL, "permissao_id" bigint NOT NULL, CONSTRAINT "PK_c2275cafd5b7251e1901e02768d" PRIMARY KEY ("usuario_id", "permissao_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a590446adec482807e08a9f17f" ON "usuarios_permissoes" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc6db171d9b3fa0891abc5c204" ON "usuarios_permissoes" ("permissao_id") `);
        await queryRunner.query(`CREATE TABLE "usuarios_roles" ("usuario_id" bigint NOT NULL, "role_id" bigint NOT NULL, CONSTRAINT "PK_98022d9c2727ebbf9bd2042d30b" PRIMARY KEY ("usuario_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c14b9e5e2d0cf077fa4dd3350" ON "usuarios_roles" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_25bde7adfa5d3084b099da6476" ON "usuarios_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "roles_permissoes" ADD CONSTRAINT "FK_52f0c89db985effd01e6f2cc53f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissoes" ADD CONSTRAINT "FK_45ff8f6ce0e9a2342b05b1f64b8" FOREIGN KEY ("permissao_id") REFERENCES "permissoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" ADD CONSTRAINT "FK_a590446adec482807e08a9f17fc" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" ADD CONSTRAINT "FK_bc6db171d9b3fa0891abc5c204c" FOREIGN KEY ("permissao_id") REFERENCES "permissoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" ADD CONSTRAINT "FK_2c14b9e5e2d0cf077fa4dd33502" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" ADD CONSTRAINT "FK_25bde7adfa5d3084b099da64769" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_roles" DROP CONSTRAINT "FK_25bde7adfa5d3084b099da64769"`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" DROP CONSTRAINT "FK_2c14b9e5e2d0cf077fa4dd33502"`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" DROP CONSTRAINT "FK_bc6db171d9b3fa0891abc5c204c"`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" DROP CONSTRAINT "FK_a590446adec482807e08a9f17fc"`);
        await queryRunner.query(`ALTER TABLE "roles_permissoes" DROP CONSTRAINT "FK_45ff8f6ce0e9a2342b05b1f64b8"`);
        await queryRunner.query(`ALTER TABLE "roles_permissoes" DROP CONSTRAINT "FK_52f0c89db985effd01e6f2cc53f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25bde7adfa5d3084b099da6476"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c14b9e5e2d0cf077fa4dd3350"`);
        await queryRunner.query(`DROP TABLE "usuarios_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc6db171d9b3fa0891abc5c204"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a590446adec482807e08a9f17f"`);
        await queryRunner.query(`DROP TABLE "usuarios_permissoes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45ff8f6ce0e9a2342b05b1f64b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52f0c89db985effd01e6f2cc53"`);
        await queryRunner.query(`DROP TABLE "roles_permissoes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "permissoes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
