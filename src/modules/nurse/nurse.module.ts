import { Module } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";
import {NurseService} from "./nurse.service";
import { NurseController } from "./nurse.controller";

@Module({
    imports: [PrismaModule],
    controllers: [NurseController],
    providers: [NurseService, PrismaService],
})
export class NurseModule { }
