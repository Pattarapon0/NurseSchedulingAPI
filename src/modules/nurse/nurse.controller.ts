import { Controller,Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/auth.guard";
import { Roles } from "src/common/decorator/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { NurseService } from './nurse.service';
import { role } from '@prisma/client';

@Controller('nurses')
@UseGuards(JwtAuthGuard,RolesGuard)
export class NurseController {
    constructor(private nurseService: NurseService) { }

    @Get()
    @Roles([role.head_nurse])
    async getAllNurses() {
        return this.nurseService.getAllNurses();
    }
}