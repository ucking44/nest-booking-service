import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/Payment';
import { CreatePaymentParams, UpdatePaymentParams } from 'src/utils/payment/types';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>) {}

    async createPayment(createPaymentParams: CreatePaymentParams)
    {
        const savePayment = await this.paymentRepo.create(createPaymentParams)
        const result = await this.paymentRepo.save(savePayment)
        return result
    }

    async fetchPayments()
    {
        const allPayments = await this.paymentRepo.find({ relations: ['user', 'booking']})
        return allPayments
    }

    async updatePayment(id: number, updatePaymentParams: UpdatePaymentParams)
    {
        const updatePaymentById = await this.paymentRepo.update(id, updatePaymentParams)
        return updatePaymentById
    }

    async fetchSinglePayment(id: number)
    {
        const singlePayment = await this.paymentRepo.findOne({ where: { id: id }, relations: ['user', 'booking'] })
        return singlePayment
    }

    async deletePayment(id: number)
    {
        const delPay = await this.paymentRepo.findOne({ where: { id: id } })
        if (delPay)
        {
            return await this.paymentRepo.remove(delPay)
        }
    }
}
