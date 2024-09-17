import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusService } from 'src/bus/bus.service';
import { DriverService } from 'src/driver/driver.service';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { UserService } from 'src/user/user.service';
import { CreateScheduleParams, UpdateScheduleParams } from 'src/utils/schedule/types';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
    constructor(@InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
        private readonly userService: UserService,
        private readonly busService: BusService,
        private readonly driverService: DriverService
    ) {}

    async createSchedule(scheduleParams: CreateScheduleParams)
    {        
        const saveSchedule = await this.scheduleRepo.create(scheduleParams)
        return this.scheduleRepo.save(saveSchedule)
    }

    async fetchAllSchedules()
    {
        const fetchSchedules = await this.scheduleRepo.find({ relations: ['user', 'bus', 'driver'] })
        return fetchSchedules
    }

    async updateScheduleID(id: number, updateScheduleParams: UpdateScheduleParams)
    {
        await this.scheduleRepo.findOne({ where: { id: id } })
        //const scheduleID = await this.scheduleRepo.findOne({ where: { id: id } })
        const updateScheduleByID = await this.scheduleRepo.update(id, updateScheduleParams)
        return updateScheduleByID
    }

    async getSingleScheduleById(id: number)
    {
        return await this.scheduleRepo.findOne({ where: { id: id }, relations: ['user', 'bus', 'driver' ] })
    }

    async deleteScheduleById(id: number)
    {
        const deleteById = await this.scheduleRepo.findOne({ where: { id: id } })
        if (deleteById) 
        {
            return await this.scheduleRepo.remove(deleteById)
        }
    }
}
