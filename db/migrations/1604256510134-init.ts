import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';
import { isGenericTypeAnnotation } from '@babel/types';


export class init1604256510134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'links',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    length: '2000',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'INTEGER',
                    length: '32',
                    isNullable: false,
                    isUnique: false,
                },
                {
                    name: 'code',
                    type: 'char',
                    length: '6',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));

        await queryRunner.createForeignKey('user_fk', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'RESTRICT',
          }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('links');
    }
}
    