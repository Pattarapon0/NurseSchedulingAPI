import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller'
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ShiftsController],
    providers: [ShiftsService, PrismaService],
})
export class ShiftsModule { }
