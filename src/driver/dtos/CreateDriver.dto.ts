import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDriverDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty({ message: 'Driver Name is required!' })
    @IsString()
    driver_name: string

    @IsNotEmpty()
    @IsString()
    driver_contact: string
}
