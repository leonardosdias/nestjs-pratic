import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from '../database/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async index(): Promise<UserEntity[]> {
        const user = await this.usersService.findAll();

        return user;
    }

    @Post()
    @ApiBody({ type: UserDTO })
    async create(@Body() user: User): Promise<UserEntity> {
        const newUser = await this.usersService.create(user);

        return newUser;
    }
}
