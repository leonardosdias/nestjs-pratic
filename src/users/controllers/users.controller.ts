import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController implements OnModuleInit {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'user-consumer',
                allowAutoTopicCreation: true
            }
        }
    })

    private client: ClientKafka;

    async onModuleInit() {
        const requestPatters = [
            'find-all-users',
            'create-user'
        ];

        requestPatters.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern);

            await this.client.connect();
        })
    }

    @Get()
    index(): Observable<User[]> {
        const user = this.client.send('find-all-users', {});

        return user;
    }

    @Post()
    @ApiBody({ type: UserDTO })
    create(@Body() user: User): Observable<User> {
        const newUser = this.client.send('create-user', user);

        return newUser;
    }
}
