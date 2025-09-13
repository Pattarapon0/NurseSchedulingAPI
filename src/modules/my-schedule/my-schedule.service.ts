import { PrismaService } from "../../../prisma/prisma.service";
import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class MyScheduleService {
    constructor(private prisma: PrismaService) { }

    async getMySchedule(userId: string) {
       try {
        return this.prisma.shift_assignments.findMany({
            where: { user_id: userId },
            include: {
                shift: true,
                leave_requests: { include: { approved_by_user: { select: { name: true, email: true } } } }
            },
            orderBy: { shift: { date: 'asc' } }  // Sort by shift date and start time in ascending order
        });
         } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error("Error retrieving schedule:", error);
            throw new InternalServerErrorException("Error retrieving schedule");
        }
    }
}