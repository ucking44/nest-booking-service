import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UserService } from 'src/user/user.service';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from './dtos/UpdateCustomer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService, private userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async saveCustomer(@Res() res, @Body() customerDto: CreateCustomerDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(customerDto.user_id)
        if (!checkIfUserExist)
        {
            res.status(404).json({
                'status': false
            })
        }
        else
        {
            const insertCust = await this.customerService.saveCustomer(customerDto)
            if (insertCust)
            {
                return res.status(201).json({
                    status: true,
                    message: 'Customer Was Created Successfully!',
                    data: insertCust
                })
            }
            else
            {
                res.status(500).json({
                    status: false,
                    message: 'Something Went Wrong With The Code...'
                })
            }
        }
    }

    @Get()
    async getCustomers(@Res() res)
    {
        const allCustomers = await this.customerService.fetchCustomers()
        if (allCustomers.length !== 0)
        {
            return res.status(200).json({
                status: true,
                data: allCustomers
            })
        }
        else
        {
            return res.status(404).json({
                status: false,
                message: 'No Customer Record Was Found!'
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCustomer(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCustomerDto)
    {
        const checkIfUserExist = await this.userService.fetchSingleUser(updateDto.user_id)
        const checkIfCustomerExist = await this.customerService.updateCustomerById(id, updateDto)
        if (!checkIfUserExist)
        {
            return res.status(404).json({
                status: false
            })
        }
        else if (checkIfCustomerExist.affected === 0)
        {
            return res.status(404).json({
                status: false,
                message: `Customer With The ID Of ${ id } Does Not Exist...`
            })
        }
        else
        {
            return res.status(200).json({
                status: true,
                message: 'Customer Was Updated Successfully!',
                //data: checkIfCustomerExist
            })
        }
    }

    @Get('/:id')
    async singleCustomer(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const customerByID = await this.customerService.fetchSingleCustomerById(id)
        if (!customerByID)
        {
            res.status(404).json({
                success: false,
                message: `Customer With The ID Of ${ id } Does Not Exist...!`
            })
        }
        else
        {
            res.status(200).json({
                status: true,
                data: customerByID
            })
        }
    }

    @Delete('/:id')
    async deleteCustomer(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const removeCustomer = await this.customerService.deleteCustomerById(id)
        if (removeCustomer.affected === 0)
        {
            res.status(404).json({
                success: false,
                message: `Customer With The ID Of ${ id } Does Not Exist...!`
            })
        }
        else
        {
            res.status(200).json({
                status: true,
                message: 'Customer Was Deleted Successfully!'
            })
        }
    }
}
