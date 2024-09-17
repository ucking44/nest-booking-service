import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class UpdatePaymentDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id:number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    booking_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    amount_paid: number

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    payment_date: Date
}
