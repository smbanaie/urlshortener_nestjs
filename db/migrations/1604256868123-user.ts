import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';
import { isGenericTypeAnnotation } from '@babel/types';

export class user1604256868123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
          name: 'user',
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
              name: 'username',
              type: 'varchar',
              length: '50',
              isNullable: false, 
            },
            {
                name: 'password',
                type: 'varchar',
                length: '50',
                isNullable: false, 
              },
              {
                name: 'email',
                type: 'varchar',
                length: '100',
                isNullable: true,
                isUnique : true,
              },

          ],
        }));


  
    } 
      public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
      }

}
