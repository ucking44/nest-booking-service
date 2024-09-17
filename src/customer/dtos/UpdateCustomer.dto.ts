import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator"

export class UpdateCustomerDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty({ message: 'Customer Name is Required!'})
    @IsString()
    customer_name: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    customer_contact: string

    @IsOptional()
    @IsNotEmpty()
    @IsEmail(undefined, { message: 'It Must Be An Email...'})
    @MinLength(3)
    customer_email: string

    @IsOptional()
    username: string

    @IsOptional()
    @MinLength(6)
    @IsStrongPassword(undefined, { message: 'Password Must Contain At Least One Special Character, Uppercase and number' })
    password: string

    @IsOptional()
    @IsInt({ message: 'Account Status Must Be Of Type Number' })
    account_status: number
}