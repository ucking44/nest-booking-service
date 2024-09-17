import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dtos/CreateBus.dto';
import { UpdateBusDto } from './dtos/UpdateBus.dto';

@Controller('bus')
export class BusController {
    constructor(private busService: BusService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createBus(@Body() createBusDto: CreateBusDto)
    {
        return this.busService.createBus(createBusDto)
    }

    @Get()
    async fetchBuses()
    {
        const allBuses = await this.busService.fetchAllBuses()
        return allBuses
    }

    @Get(':id')
    findSingleBus(@Param('id', ParseIntPipe) id: number)
    {
        return this.busService.findOne(id)
    }

    @Put(':id')
    updateBusById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBusDto: UpdateBusDto
    ) {
        return this.busService.updateBus(id, updateBusDto)
    }

    @Delete(':id')
    async destroyBus(@Param('id', ParseIntPipe) id: number)
    {
        try 
        {
            await this.busService.deleteBus(id)
            return {
                success: true,
                message: 'Bus Was Deleted Successfully!'
            }
        } 
        catch (error) 
        {
            return {
                success: false,
                message: error.message
            }
        }
    }
        
}
