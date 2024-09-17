import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto
{
    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    contact_no: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email_address: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsStrongPassword(undefined, { message: 'Password Must Contain At Least One Special Character, Uppercase and number' })
    userpassword: string;

    account_category: number;

    account_status: number;

    created_at?: Date;

    updated_at?: Date;
}
