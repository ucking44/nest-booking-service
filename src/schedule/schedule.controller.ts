import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dtos/CreateSchedule.dto';
import { UserService } from 'src/user/user.service';
import { BusService } from 'src/bus/bus.service';
import { DriverService } from 'src/driver/driver.service';
import { UpdateScheduleDto } from './dtos/UpdateSchedul.dto';

@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService,
        private readonly userService: UserService,
        private readonly busService: BusService,
        private readonly driverService: DriverService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertSchedule(@Res() res, @Body() scheduleDto: CreateScheduleDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(scheduleDto.user_id)
        const checkIfBusExist = await this.busService.findOne(scheduleDto.bus_id)
        const checkIfDriverExist = await this.driverService.getDriverById(scheduleDto.driver_id)
        const saveSchedule = await this.scheduleService.createSchedule(scheduleDto)
        if (!checkIfUserExist)
        {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'User Does Not Exist...'
            })
        }
        else if (!checkIfBusExist)
        {
            res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'Bus Does Not Exist..!'
            })
        }
        else if (!checkIfDriverExist)
        {
            res.status(404).json({
                success: false,
                message: 'Driver Does Not Exist...'
            })
        }
        else
        {
            return res.status(201).json({
                success: true,
                message: 'Schedule Was Created Successfully!',
                data: saveSchedule
            })
        }            
    }

    @Get()
    async fetchSchedules(@Res() res)
    {
        const fetchAllSchedules = await this.scheduleService.fetchAllSchedules()
        if (fetchAllSchedules.length !== 0)
        {
            res.status(200).json({
                success: true,
                datas: fetchAllSchedules
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: 'No Schedule Record Was Found...'
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateSchedule(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateScheduleDto: UpdateScheduleDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(updateScheduleDto.user_id)
        const checkIfBusExist = await this.busService.findOne(updateScheduleDto.bus_id)
        const checkIfDriverExist = await this.driverService.getDriverById(updateScheduleDto.driver_id)
        const updateSchedule = await this.scheduleService.updateScheduleID(id, updateScheduleDto)
        if (!checkIfUserExist)
        {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'User Does Not Exist...'
            })
        }
        else if (!checkIfBusExist)
        {
            res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'Bus Does Not Exist..!'
            })
        }
        else if (!checkIfDriverExist)
        {
            res.status(404).json({
                success: false,
                message: 'Driver Does Not Exist...'
            })
        }
        else if (updateSchedule.affected === 0)
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: 'Schedule Was Updated Successfully!',
                //data: updateSchedule
            })
        }
    }

    @Get('/:id')
    async getSingleSchedule(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const scheduleById = await this.scheduleService.getSingleScheduleById(id)
        if (!scheduleById)
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: scheduleById
            })
        }
    }

    @Delete('/:id')
    async deleteSchedule(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const deleteByID = await this.scheduleService.deleteScheduleById(id)
        if (!deleteByID)
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: `Schedule With The ID Of ${ id } Was Deleted Successfully...`
            })
        }
    }
}
