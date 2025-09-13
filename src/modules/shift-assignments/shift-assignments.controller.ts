import { Controller, UseGuards,Body, Post  } from "@nestjs/common";
import { ShiftAssignmentsService } from "./shift-assignments.service";
import { CreateShiftAssignmentDto } from "./dto/create-shift-assignment.dto";
import { role, shift_assignments } from "@prisma/client";
import { JwtAuthGuard } from "src/common/guards/auth.guard";
import { Roles } from "src/common/decorator/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('shift-assignments')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles([role.head_nurse])
export class ShiftAssignmentsController {
    constructor(private shiftAssignmentsService: ShiftAssignmentsService) { }
    @Post()
    async createShiftAssignment(@Body() createShiftAssignmentDto: CreateShiftAssignmentDto): Promise<shift_assignments> {
        return this.shiftAssignmentsService.createShiftAssignment(createShiftAssignmentDto);
    }
}