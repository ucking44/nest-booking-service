import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/Customer';
import { CreateCustomerParams, UpdateCustomerParams } from 'src/utils/customer/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

const salting = bcrypt.genSaltSync(10)

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customer) private readonly customerRepo: Repository<Customer>) {}

    async createCustomer(createCustomerParams: CreateCustomerParams)
    {
        const saveCustomer = this.customerRepo.create(createCustomerParams)
        const result = await this.customerRepo.save(saveCustomer)
        return result
    }

    async saveCustomer(createCustomerParams: CreateCustomerParams)
    {
        const newPassword = createCustomerParams.password
        const hashPassword = bcrypt.hashSync(newPassword, salting)

        const insertCustomer = await this.customerRepo.save({
            user_id: createCustomerParams.user_id,
            customer_name: createCustomerParams.customer_name,
            customer_contact: createCustomerParams.customer_contact,
            customer_email: createCustomerParams.customer_email,
            username: createCustomerParams.username,
            password: hashPassword,
            account_status: createCustomerParams.account_status
        })

        return insertCustomer
    }

    async fetchCustomers()
    {
        const allCustomers = await this.customerRepo.find()
        return allCustomers
    }

    async updateCustomerById(id: number, updateCustomerParam: UpdateCustomerParams)
    {
        const updateCustomer = await this.customerRepo.update(id, updateCustomerParam)
        return updateCustomer
    }

    async fetchSingleCustomerById(id: number)
    {
        const customerById = await this.customerRepo.findOne({ where: { id: id } })
        return customerById
    }

    async deleteCustomerById(id: number)
    {
        //const customerById = await this.customerRepo.findOne({ where: { id: id } })
        const deleteCustomer = await this.customerRepo.delete(id)
        return deleteCustomer
    }
}
