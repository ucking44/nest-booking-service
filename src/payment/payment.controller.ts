import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentParams } from 'src/utils/payment/types';
import { UserService } from 'src/user/user.service';
import { BookingService } from 'src/booking/booking.service';
import { UpdatePaymentDto } from './dtos/UpdatePayment.dto';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly userService: UserService,
        private readonly bookingService: BookingService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertPayment(@Res() res, @Body() paymentParams: CreatePaymentParams)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(paymentParams.user_id)
        const checkIfBookingExist = await this.bookingService.fetchSingleBooking(paymentParams.booking_id)

        if (!checkIfUserExist)
        {
            return res.status(404).json({
                success: false
            })
        }
        else if (!checkIfBookingExist)
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'Booking Was Not Found...'
            })
        }
        else
        {
            const result = await this.paymentService.createPayment(paymentParams)

            return res.status(HttpStatus.CREATED).json({
                success: true,
                message: 'Payment Was Save Successfully!',
                data: result
            })
        }
    }

    @Get()
    async fetchAllPayments(@Res() res)
    {
        const allPayments = await this.paymentService.fetchPayments()

        if (allPayments.length !== 0)
        {
            return res.status(HttpStatus.OK).json({
                success: true,
                data: allPayments
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: 'No Payment Record Was Found!'
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePaymentByID(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updatePaymentDto: UpdatePaymentDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(updatePaymentDto.user_id)
        const checkIfBookingExist = await this.bookingService.fetchSingleBooking(updatePaymentDto.booking_id)

        if (!checkIfUserExist)
        {
            return res.status(404).json({
                success: false
            })
        }
        else if (!checkIfBookingExist)
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'Booking Was Not Found...'
            })
        }
        else
        {
            const updateById = await this.paymentService.updatePayment(id, updatePaymentDto)

            if (updateById.affected === 0)
            {
                return res.status(404).json({
                    success: false,
                    message: `Payment With The ID Of ${ id } Does Not Exist...`
                })
            }
            else
            {
                return res.status(200).json({
                    success: true,
                    message: 'Payment Was Updated Successfully!'
                })
            }
        }
    }

    @Get('/:id')
    async getSinglePayment(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const paymentByID = await this.paymentService.fetchSinglePayment(id)

        if (!paymentByID)
        {
            return res.status(404).json({
                success: false,
                message: `Payment With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: paymentByID
            })
        }
    }

    @Delete('/:id')
    async deletePaymentById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const removepaymentByID = await this.paymentService.deletePayment(id)

        if (!removepaymentByID)
        {
            return res.status(404).json({
                success: false,
                message: `Payment With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: 'Payment Was Deleted Successfully!'
                //data: removepaymentByID
            })
        }
    }
}
