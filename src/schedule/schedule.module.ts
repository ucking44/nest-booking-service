import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { UserModule } from 'src/user/user.module';
import { BusModule } from 'src/bus/bus.module';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), UserModule, BusModule, DriverModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
