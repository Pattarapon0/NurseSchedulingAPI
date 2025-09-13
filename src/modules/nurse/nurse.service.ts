import { Injectable, InternalServerErrorException ,HttpException} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { role } from '@prisma/client';

@Injectable()
export class NurseService {
    constructor(private prisma: PrismaService) { }
    async getAllNurses() {
        try {
            return this.prisma.users.findMany({
                where: { role: role.nurse },
                select: { id: true, name: true, email: true }
            });
        } catch (error) {
             if (error instanceof HttpException) {
                            throw error;
                        }   
            throw new InternalServerErrorException("Error retrieving nurses");
        }
    }
}