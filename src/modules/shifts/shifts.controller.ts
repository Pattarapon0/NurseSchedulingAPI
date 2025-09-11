import {    Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { role } from 'generated/prisma';

@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @Post()
    @Roles([role.head_nurse])
    create(@Body() createShiftDto: CreateShiftDto) {
        return this.shiftsService.createShift(createShiftDto);
    }

    @Get()
    @Roles([role.head_nurse])
    findAll() {
        return this.shiftsService.getAllShifts();
    }
}