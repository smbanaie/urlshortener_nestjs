import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddToLinkUserFK1604259787061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('links', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'RESTRICT',
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
