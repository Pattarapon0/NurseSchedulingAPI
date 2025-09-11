import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ShiftsModule } from './modules/shifts/shifts.module';
import { ShiftAssignmentsModule } from './modules/shift-assignments/shift-assignments.module';
import { LeaveRequestsModule } from './modules/leave-requests/leave-requests.module';
import { MyScheduleModule } from './modules/my-schedule/my-schedule.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time window: 60 seconds
      limit: 100, // Max 100 requests per minute per IP
    }]),
    
    // Database
    PrismaModule,
    
    // Feature modules
    AuthModule,
    ShiftsModule,
    ShiftAssignmentsModule,
    LeaveRequestsModule,
    MyScheduleModule,
  ],
})
export class AppModule {}
