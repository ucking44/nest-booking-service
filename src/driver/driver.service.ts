import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/typeorm/entities/Driver';
import { User } from 'src/typeorm/entities/User';
import { UserService } from 'src/user/user.service';
import { CreateDriverParams, UpdateDriverParams } from 'src/utils/driver/types';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(Driver) private readonly driverRepo: Repository<Driver>,
        //@InjectRepository(User) private useRepo: Repository<User>
        private readonly userService: UserService
    ) {}

    async createDriver(createDriverParams: CreateDriverParams)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(createDriverParams.user_id)
        if (!checkIfUserExist)
        {
            return new HttpException
            (
                'User Not Found And Could Not Create Driver',
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const newDriver = this.driverRepo.create(createDriverParams)
            return this.driverRepo.save(newDriver)
        }
    }

    async fetchDrivers()
    {
        const allDrivers = await this.driverRepo.find()
        return allDrivers
    }

    async updateDriver(id: number, driverUpdateParams: UpdateDriverParams)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(driverUpdateParams.user_id)
        if (!checkIfUserExist)
        {
            return new HttpException
            (
                'User Not Found And Could Not Update Driver!',
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const checkIfDriverIDExist = await this.driverRepo.findOne({ where: { id: id } })
            if(!checkIfDriverIDExist)
            {
                throw new HttpException
                (
                    `Driver With The ID Of ${ id } Was Not Found!`,
                    HttpStatus.NOT_FOUND
                )
            }
            else
            {
                const updateDriverById = await this.driverRepo.update(id, driverUpdateParams)
                return updateDriverById
                //return this.driverRepo.update({ id }, { ...driverUpdateParams });
            }
        }
    }

    async getDriverById(id: number)
    {
        const checkIfDriverIDExist = await this.driverRepo.findOne({ where: { id: id } })
        if(checkIfDriverIDExist)
        {
            return checkIfDriverIDExist
        }
        else
        {
            throw new HttpException
            (
                `Driver With The ID Of ${ id } Was Not Found!`,
                HttpStatus.NOT_FOUND
            )
        }
    }

    async deleteDriver(id: number)
    {
        const checkIfDriverIDExist = await this.driverRepo.findOne({ where: { id: id } })
        if(checkIfDriverIDExist)
        {
            return await this.driverRepo.delete(id)
        }
    }
}
