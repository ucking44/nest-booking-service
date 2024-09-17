import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateBookingDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    @IsNumber()
    schedule_id: number

    @IsNotEmpty()
    @IsNumber()
    customer_id: number

    @IsNotEmpty()
    @IsNumber()
    number_of_seats: number

    @IsNotEmpty({ message: 'Fare Amount is required!' })
    @IsNumber()
    fare_amount: number

    //@IsNotEmpty()
    //@IsNumber()
    total_amount: number

    @IsNotEmpty()
    @IsDateString()
    date_of_booking: Date

    @IsOptional()
    @IsInt({ message: 'The Booking Status Must Be Of Type Number' })
    booking_status: number
}
