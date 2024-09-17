import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto
{
    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    contact_no: string;

    @IsEmail()
    @IsNotEmpty()
    email_address: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    userpassword: string;

    account_category: number;

    account_status: number;

    created_at?: Date;

    updated_at?: Date;
}
