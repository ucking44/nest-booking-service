import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateScheduleDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    bus_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    driver_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    starting_point: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    destination: string

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    //@IsDate()
    schedule_date: Date

    @IsOptional()
    @IsNotEmpty()
    departure_time: string

    @IsOptional()
    @IsNotEmpty()
    estimated_arrival_time: string

    @IsOptional()
    @IsNotEmpty({ message: 'Fare Amount is required!' })
    @IsNumber()
    fare_amount: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    remarks: string
}
