import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, BadRequestException, ConflictException, NotFoundException, HttpException } from "@nestjs/common/exceptions";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateShiftAssignmentDto } from "./dto/create-shift-assignment.dto";
import { role } from "../../../generated/prisma";

@Injectable()
export class ShiftAssignmentsService {
    constructor(private prisma: PrismaService) { }

    async createShiftAssignment(data: CreateShiftAssignmentDto) {
        try {
            const [user, shift] = await Promise.all([
                this.prisma.users.findUnique({ where: { id: data.userId } }),
                this.prisma.shifts.findUnique({ where: { id: data.shiftId } })
            ]);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            if (!shift) {
                throw new NotFoundException('Shift not found');
            }
            if (user.role !== role.nurse) {
                throw new BadRequestException('Only users with the nurse role can be assigned to shifts');
            }
            if (shift.start_time < new Date()) {
                throw new BadRequestException('Cannot assign nurse to a shift in the past');
            }
            return this.prisma.shift_assignments.create({
                data: {
                    user_id: data.userId,
                    shift_id: data.shiftId,
                },
                include: { user: true, shift: true }
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            if (error.code === 'P2002') {
                throw new ConflictException('User already assigned to this shift');
            }
            throw new InternalServerErrorException(`Failed to create shift assignment: ${error.message}`);
        }
    }
}