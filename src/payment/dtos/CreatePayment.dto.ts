import { IsDateString, IsNotEmpty, IsNumber } from "class-validator"

export class CreatePaymentDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id:number

    @IsNotEmpty()
    @IsNumber()
    booking_id: number

    @IsNotEmpty()
    @IsNumber()
    amount_paid: number

    @IsNotEmpty()
    @IsDateString()
    payment_date: Date
}
