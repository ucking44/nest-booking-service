import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from 'src/typeorm/entities/Bus';
import { User } from 'src/typeorm/entities/User';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bus]), UserModule],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService]
})
export class BusModule {}
