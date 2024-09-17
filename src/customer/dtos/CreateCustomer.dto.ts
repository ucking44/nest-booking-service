import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator"

export class CreateCustomerDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty({ message: 'Customer Name is Required!'})
    @IsString()
    customer_name: string

    @IsNotEmpty()
    @IsString()
    customer_contact: string

    @IsNotEmpty()
    @IsEmail(undefined, { message: 'It Must Be An Email...'})
    @MinLength(3)
    customer_email: string

    @IsOptional()
    username: string

    @MinLength(6)
    @IsStrongPassword(undefined, { message: 'Password Must Contain At Least One Special Character, Uppercase and number' })
    password: string

    @IsInt({ message: 'Account Status Must Be Of Type Number' })
    account_status: number
}
