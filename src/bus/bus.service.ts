import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from 'src/typeorm/entities/Bus';
import { User } from 'src/typeorm/entities/User';
import { UserService } from 'src/user/user.service';
import { CreateBusParams, UpdateBusParams } from 'src/utils/bus/types';
import { Repository } from 'typeorm';
import { CreateBusDto } from './dtos/CreateBus.dto';

@Injectable()
export class BusService {
    constructor(
        @InjectRepository(Bus) private busRepo: Repository<Bus>,
        //@InjectRepository(User) private useRepo: Repository<User>,
        private userService: UserService
    ) {}

    async insertBus(createBusParams: CreateBusDto)
    {
        const userFound = await this.userService.fetchSingleUser(createBusParams.user_id)
        if (!userFound)
        {
            return new HttpException
            (
                'User Not Found And Could Not Create Bus',
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const newBus = this.busRepo.create(createBusParams)
            return this.busRepo.save(newBus)
        }
    }

    async createBus(busDetails: CreateBusParams)
    {
        //const userId = await this.useRepo.findOneBy({ id })
        const userFound = await this.userService.fetchSingleUser(busDetails.user_id)
        if (!userFound)
        {
            return new HttpException
            (
                'User Not Found And Could Not Create Bus!',
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const saveBus = await this.busRepo.save(
                
                {
                    user_id: busDetails.user_id,
                    bus_number: busDetails.bus_number,
                    bus_plate_number: busDetails.bus_plate_number,
                    bus_type: busDetails.bus_type,
                    capacity: busDetails.capacity
                    //userFound: busDetails.user_id
                }
            )

            return saveBus
        }
    }

    fetchAllBuses()
    {
        return this.busRepo.find({ relations: ['user'] })
    }

    async findOne(id: number)
    {
        const busId = await this.busRepo.findOne({ where: { id: id }, relations: ['user'] })
        if (!busId)
        {
            throw new HttpException
            (
                `Bus With The ID Of ${ id } Not Found!`,
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            return busId
        }
    }

    async updateBus(id: number, busDetails: UpdateBusParams)
    {
        const userFound = await this.userService.fetchSingleUser(busDetails.user_id)
        if (!userFound)
        {
            return new HttpException
            (
                'User Not Found And Could Not Update Bus!',
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const busId = await this.busRepo.findOne({ where: { id: id }})
            if (busId)
            {
                const updateBusById = await this.busRepo.save(
                
                    {
                        id: busId.id,
                        user_id: busDetails.user_id,
                        bus_number: busDetails.bus_number,
                        bus_plate_number: busDetails.bus_plate_number,
                        bus_type: busDetails.bus_type,
                        capacity: busDetails.capacity
                    }
                )
    
                return updateBusById
            }
            else
            {
                throw new HttpException
                (
                    `Bus With The ID Of ${ id } Not Found...!`,
                    HttpStatus.NOT_FOUND
                )
            }
        }
    }

    async deleteBus(id: number)
    {
        const busId = await this.busRepo.findOne({ where: { id: id }})
        if (!busId)
        {
            throw new HttpException
            (
                `Bus With The ID Of ${ id } Not Found...!`,
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            return await this.busRepo.remove(busId)
        }
    }
}
