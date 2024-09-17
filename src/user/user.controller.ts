import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto)
    {
        return this.userService.saveUser(createUserDto)
    }

    @Get()
    async getUsers()
    {
        const allUsers = await this.userService.fetchUsers()
        return allUsers
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        const updateUser = await this.userService.updateUser(id, updateUserDto)
        return updateUser
    }

    @Get(':id')
    getSingleUserById(@Param('id', ParseIntPipe) id: number)
    {
        const singleUser = this.userService.fetchSingleUser(id)
        return singleUser
    }

    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.deleteUser(id)
    }
}
