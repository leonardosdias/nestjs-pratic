import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDTO } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    index(): User[] {
        return this.usersService.findAll();
    }

    @Post()
    @ApiBody({ type: UserDTO })
    create(@Body() user: User): User {
        return this.usersService.create(user);
    }
}
