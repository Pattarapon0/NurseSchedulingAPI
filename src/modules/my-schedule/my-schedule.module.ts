
import { Module } from '@nestjs/common';
import { MyScheduleController } from './my-schedule.controller';
import { MyScheduleService } from './my-schedule.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MyScheduleController],
  providers: [MyScheduleService],
})
export class MyScheduleModule {}