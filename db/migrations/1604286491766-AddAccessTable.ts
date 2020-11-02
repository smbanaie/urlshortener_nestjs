import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm";

export class AddAccessTable1604286491766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'accesses',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'link_id',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'referrer_url',
                    type: 'varchar',
                    length: '2000',
                    isNullable: true,
                },
                {
                    name: 'user_agent',
                    type: 'varchar',
                    length: '2000',
                    isNullable: true,
                },
                {
                    name: 'browser',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,

                }, {
                    name: 'ip',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,

                },
                {
                    name: 'os',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,

                },
                {
                    name: 'agent_type',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,

                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                }
            ],
        }));

        await queryRunner.createForeignKey('accesses', new TableForeignKey({
            columnNames: ['link_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'links',
            onDelete: 'RESTRICT',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('accesses');
    }

}
