import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateScheduleDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    @IsNumber()
    bus_id: number

    @IsNotEmpty()
    @IsNumber()
    driver_id: number

    @IsNotEmpty()
    @IsString()
    starting_point: string

    @IsNotEmpty()
    @IsString()
    destination: string

    @IsNotEmpty()
    @IsDateString()
    //@IsDate()
    schedule_date: Date

    @IsNotEmpty()
    departure_time: string

    @IsNotEmpty()
    estimated_arrival_time: string

    @IsNotEmpty({ message: 'Fare Amount is required!' })
    @IsNumber()
    fare_amount: number

    @IsNotEmpty()
    @IsString()
    remarks: string
}
