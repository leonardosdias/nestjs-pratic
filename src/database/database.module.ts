import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/database/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5430,
            username: 'postgres',
            password: 'docker',
            database: 'nestjs_pratic',
            entities: [UserEntity],
            synchronize: true
        }),
    ]
})
export class DatabaseModule { }
