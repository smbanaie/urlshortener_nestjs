import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';
import { isGenericTypeAnnotation } from '@babel/types';


export class init1604256510134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'links',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'url',
                    type: 'varchar',
                    length: '2000',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                    isUnique: false,
                },
                {
                    name: 'code',
                    type: 'char',
                    length: '10',
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

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('links');
    }
}
    