import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/CreateBooking.dto';
import { UserService } from 'src/user/user.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CustomerService } from 'src/customer/customer.service';
import { UpdateBookingDto } from './dtos/UpdateBooking.dto';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
        private userService: UserService,
        private readonly scheduleService: ScheduleService,
        private readonly customerService: CustomerService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async saveBooking(@Res() res, @Body() createBookingDto: CreateBookingDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(createBookingDto.user_id)
        const checkIfScheduleExist = await this.scheduleService.getSingleScheduleById(createBookingDto.schedule_id)
        const checkIfCustomerExist = await this.customerService.fetchSingleCustomerById(createBookingDto.customer_id)

        if (!checkIfUserExist)
        {
            return res.status(404).json({
                success: false
            })
        }
        else if (!checkIfScheduleExist)
        {
            return res.status(404).json({
                success: false,
                message: `Schedule Was Not Found`
            })
        }
        else if (!checkIfCustomerExist)
        {
            return res.status(404).json({
                success: false,
                message: `Customer Was Not Found`
            })
        }
        else
        {
            const insertBooking = await this.bookingService.insertBooking(createBookingDto)
            if (insertBooking)
            {
                return res.status(201).json({
                    success: true,
                    message: 'Booking Was Created Successfully!',
                    data: insertBooking
                })
            }
            else
            {
                return res.status(500).json({
                    success: false,
                    message: 'Ooopsss! Something Went Wrong The Code'
                })
            }
        }
    }

    @Get()
    async fetchAllBookings(@Res() res)
    {
        const bookings = await this.bookingService.fetchBookings()
        if (bookings.length !== 0)
        {
            return res.status(200).json({
                success: true,
                data: bookings
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: 'No Booking Record Was Found!'
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateBookingById(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateBookingDto)
    {
        const checkIfBookingIdExist = await this.bookingService.updateBooking(id, updateDto)
        
        if (checkIfBookingIdExist.affected === 0)
        {
            throw new HttpException
            (
                `Booking With The ID Of ${ id } Not Found...!`,
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: 'Booking Was Updated Successfully!'
            })
        }
    }

    @Get('/:id')
    async fetchBookingById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const checkIfBookingIdExist = await this.bookingService.fetchSingleBooking(id)
        if (!checkIfBookingIdExist)
        //if (checkIfBookingIdExist.length === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Booking With The ID Of ${ id } Does Not Exist`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: checkIfBookingIdExist
            })
        }
    }

    @Delete('/:id')
    async deleteBookingByID(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const destroyBooking = await this.bookingService.deleteBooking(id)
        if (destroyBooking.affected === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Booking With The ID Of ${ id } Does Not Exist`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: 'Booking Was Deleted Successfully!'
            })
        }
    }
}
