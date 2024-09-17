import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDriverDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty({ message: 'Driver Name is required!' })
    @IsString()
    driver_name: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    driver_contact: string
}
