import { Module } from "@nestjs/common";
import { ShiftAssignmentsService } from "./shift-assignments.service";
import { ShiftAssignmentsController } from "./shift-assignments.controller";
import { PrismaService } from "../../../prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ShiftAssignmentsController],
    providers: [ShiftAssignmentsService, PrismaService],
})
export class ShiftAssignmentsModule { }
