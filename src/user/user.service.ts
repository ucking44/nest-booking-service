import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/user/types';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    saltOrRounds: number = 10

    createUser(userDetails: CreateUserParams)
    {
        const newUser = this.userRepository.create({
            ...userDetails,
            created_at: new Date(),
            updated_at: new Date()
        });

        const saveUser = this.userRepository.save(newUser)
        return saveUser
    }

    async saveUser(createUserDetails: CreateUserParams)
    {
        const newPassword = createUserDetails.userpassword
        const hashPassword = await bcrypt.hash(newPassword, this.saltOrRounds)

        const insertUser = await this.userRepository.save({
            full_name: createUserDetails.full_name,
            contact_no: createUserDetails.contact_no,
            email_address: createUserDetails.email_address,
            username: createUserDetails.username,
            userpassword: hashPassword,
            account_category: createUserDetails.account_category,
            account_status: createUserDetails.account_status
        })

        return insertUser
    }

    fetchUsers()
    {
        return this.userRepository.find()
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParams)
    {
        const updateUser = await this.userRepository.findOne({ where: { id: id }})
        if(updateUser)
        {
            const updateUserById = this.userRepository.update({ id }, { ...updateUserDetails, updated_at: new Date() })
            return updateUserById
        }
        else
        {
            throw new HttpException
            (
                'User Not Found', 
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async fetchSingleUser(id: number)
    {
        const singleUser = await this.userRepository.findOne({ where: { id: id }, relations: ['buses'] })
        if(singleUser)
        {
            return singleUser
        }
        else
        {
            throw new HttpException
            (
                'User Not Found', 
                HttpStatus.NOT_FOUND
            )
        }
    }

    async deleteUser(id: number)
    {
        const user = await this.userRepository.findOne({ where: { id: id }})
        if(user)
        {
            //const deleteUser = await this.userRepository.remove(user)
            //return deleteUser
            await this.userRepository.remove(user)
            return 'User Was Delete Successfully!'
        }
        else
        {
            throw new HttpException
            (
                'User Not Found', 
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
