import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './typeorm/entities/User';
import { BusModule } from './bus/bus.module';
import { Bus } from './typeorm/entities/Bus';
import { DriverModule } from './driver/driver.module';
import { Driver } from './typeorm/entities/Driver';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './typeorm/entities/Schedule';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './typeorm/entities/Customer';
import { BookingModule } from './booking/booking.module';
import { Booking } from './typeorm/entities/Booking';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_booking_app',
      entities: [User, Bus, Driver, Schedule, Customer, Booking, Payment],
      synchronize: true
    }),
    UserModule,
    BusModule,
    DriverModule,
    ScheduleModule,
    CustomerModule,
    BookingModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
