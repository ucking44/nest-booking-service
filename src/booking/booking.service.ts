import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { Booking } from 'src/typeorm/entities/Booking';
import { UserService } from 'src/user/user.service';
import { CreateBookingParams, UpdateBookingParams } from 'src/utils/booking/types';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
        private readonly userService: UserService,
        private readonly scheduleService: ScheduleService,
        private readonly customerService: CustomerService
    ) {}

    async createBooking(createBookingParams: CreateBookingParams)
    {
        const saveBooking = await this.bookingRepo.create(createBookingParams)
        const result = await this.bookingRepo.save(saveBooking)
        return result
    }

    async insertBooking(createBookingParams: CreateBookingParams)
    {
        const seats = createBookingParams.number_of_seats
        const fareAmount = createBookingParams.fare_amount
        const total = seats * fareAmount
        const saveBooking = await this.bookingRepo.save(
                
            {
                user_id: createBookingParams.user_id,
                schedule_id: createBookingParams.schedule_id,
                customer_id: createBookingParams.customer_id,
                number_of_seats: createBookingParams.number_of_seats,
                fare_amount: createBookingParams.fare_amount,
                total_amount: total,
                date_of_booking: createBookingParams.date_of_booking,
                booking_status: createBookingParams.booking_status
            }
        )

        return saveBooking
    }

    async fetchBookings()
    {
        const allBookings = await this.bookingRepo.find({ relations: ['user', 'schedule', 'customer'] })
        return allBookings
    }

    async updateBooking(id: number, updateBookingParams: UpdateBookingParams)
    {
        const seats = updateBookingParams.number_of_seats
        const fareAmount = updateBookingParams.fare_amount
        const total = seats * fareAmount
        const checkIfUserExist = await this.userService.fetchSingleUser(updateBookingParams.user_id)
        const checkIfScheduleExist = await this.scheduleService.getSingleScheduleById(updateBookingParams.schedule_id)
        const checkIfCustomerExist = await this.customerService.fetchSingleCustomerById(updateBookingParams.customer_id)
        if (!checkIfUserExist)
        {
            throw new HttpException
            (
                `User Not Found...!`,
                HttpStatus.NOT_FOUND
            )
        }
        else if (!checkIfScheduleExist)
        {
            throw new HttpException
            (
                `Schedule Not Found...!`,
                HttpStatus.NOT_FOUND
            )
        }
        else if (!checkIfCustomerExist)
        {
            throw new HttpException
            (
                `Customer Not Found...!`,
                HttpStatus.NOT_FOUND
            )
        }
        else
        {
            const bookingId = await this.bookingRepo.findOne({ where: { id: id }})
            const updatingBooking = await this.bookingRepo.update(
                id,
                {
                    //id: bookingId.id,
                    user_id: updateBookingParams.user_id,
                    schedule_id: updateBookingParams.schedule_id,
                    customer_id: updateBookingParams.customer_id,
                    number_of_seats: updateBookingParams.number_of_seats,
                    fare_amount: updateBookingParams.fare_amount,
                    total_amount: total,
                    date_of_booking: updateBookingParams.date_of_booking,
                    booking_status: updateBookingParams.booking_status
                }
            )
            console.log(updateBookingParams.schedule_id)

            return updatingBooking
        }
    }

    async fetchSingleBooking(id: number)
    {
        const singleBooking = await this.bookingRepo.findOne({ where: { id: id }})
        //const singleBooking = await this.bookingRepo.findBy({id})
        return singleBooking
    }

    async deleteBooking(id: number)
    {
        const result = await this.bookingRepo.delete(id)
        return result
    }
}
