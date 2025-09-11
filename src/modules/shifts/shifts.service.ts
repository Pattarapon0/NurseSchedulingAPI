import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateShiftDto } from "./dto/create-shift.dto";

@Injectable()
export class ShiftsService {
    constructor(private prisma: PrismaService) { }

    async createShift(data: CreateShiftDto) {
        try {
            return this.prisma.shifts.create({
                data: {
                    date: data.date,
                    start_time: data.startTime,
                    end_time: data.endTime,
                },
            });
        } catch (error) {
            if (error instanceof HttpException) {
                           throw error;
            }    
            throw new InternalServerErrorException(`Failed to create shift: ${error.message}`);
        }
    }
    async getAllShifts() {
        try {
            const shiftsWithAssignments = await this.prisma.shifts.findMany({
                include: {
                    shift_assignments: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            return shiftsWithAssignments;
        } catch (error) {
             if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to retrieve shifts: ${error.message}`);
        }
    }
}