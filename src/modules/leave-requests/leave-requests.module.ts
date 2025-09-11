import { Module } from '@nestjs/common';
import { LeaveRequestsService } from "./leave-requests.service";
import { LeaveRequestsController } from "./leave-requests.controller";
import { PrismaModule } from "../../../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { RolesGuard } from "../../common/guards/roles.guard";


@Module({
    imports: [PrismaModule, AuthModule],
    providers: [LeaveRequestsService, RolesGuard],
    controllers: [LeaveRequestsController]
})
export class LeaveRequestsModule { }