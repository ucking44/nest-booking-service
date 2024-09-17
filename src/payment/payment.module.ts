import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/Payment';
import { UserModule } from 'src/user/user.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UserModule, BookingModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
