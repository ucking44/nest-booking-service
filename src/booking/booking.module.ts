import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/entities/Booking';
import { UserModule } from 'src/user/user.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), UserModule, ScheduleModule, CustomerModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
