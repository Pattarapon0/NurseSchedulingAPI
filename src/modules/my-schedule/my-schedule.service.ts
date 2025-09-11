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
                leave_requests: true
            }
        });
         } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Error retrieving schedule");
        }
    }
}