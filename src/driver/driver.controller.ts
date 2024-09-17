import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dtos/CreateDriver.dto';
import { UpdateDriverDto } from './dtos/UpdateDriver.dto';

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertDriver(@Body() createDriverDto: CreateDriverDto)
    {
        const saveDriver = await this.driverService.createDriver(createDriverDto)
        return {
            status: true,
            message: 'Driver Was Created Successfully!',
            data: saveDriver
        }
    }

    @Get()
    async fetchAllDrivers()
    {
        const getAllDrivers = await this.driverService.fetchDrivers()
        if (getAllDrivers)
        {
            return {
                status: true,
                data: getAllDrivers
            }
        }
        else
        {
            return {
                status: false,
                message: 'No Driver Record Was Found!'
            }
        }
    }

    @Put('/:id')
    async updateDriverById(@Param('id', ParseIntPipe) id: number, @Body() updateDriverDto: UpdateDriverDto)
    {
        const updatingDriver = await this.driverService.updateDriver(id, updateDriverDto)
        if(updatingDriver)
        {
            return {
                status: true,
                message: 'Driver Was Updated Successfully!'
            }
        }
        else
        {
            return {
                status: false,
                message: 'Something Went Wrong, Could Not Update Driver...'
            }
        }
    }

    @Get('/:id')
    async getDriverByID(@Param('id', ParseIntPipe) id: number)
    {
        const fetchDriverByID = await this.driverService.getDriverById(id)
        if (fetchDriverByID)
        {
            return {
                status: true,
                data: fetchDriverByID
            }
        }
        else
        {
            return {
                status: false,
                message: 'Ooooopssss! Something Went Wrong...'
            }
        }
    }

    @Delete('/:id')
    async destroyDriver(@Param('id', ParseIntPipe) id: number)
    {
        const deleteDriverById = await this.driverService.deleteDriver(id)
        if (deleteDriverById)
        {
            return {
                status: true,
                message: `Driver Was Deleted Successfully`
            }
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
}
