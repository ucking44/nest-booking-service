import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class UpdateBookingDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    schedule_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    customer_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    number_of_seats: number

    @IsOptional()
    @IsNotEmpty({ message: 'Fare Amount is required!' })
    @IsNumber()
    fare_amount: number

    //@IsOptional()
    //@IsNotEmpty()
    //@IsNumber()
    total_amount: number

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    date_of_booking: Date

    @IsOptional()
    @IsInt({ message: 'The Booking Status Must Be Of Type Number' })
    booking_status: number
}
