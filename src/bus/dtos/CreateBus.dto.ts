import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateBusDto
{
    @IsNotEmpty()
    user_id: number

    @IsInt()
    @IsNotEmpty()
    bus_number: number

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    bus_plate_number: string

    @IsNumber(undefined, { message: 'The Bus Type Must Be Of Type Number' })
    //@IsOptional()
    bus_type: number

    @IsOptional()
    @IsInt({ message: 'The Capacity Must Be Of Type Number' })
    capacity: number
}
