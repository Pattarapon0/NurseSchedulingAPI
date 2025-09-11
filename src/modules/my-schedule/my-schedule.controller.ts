import { Controller } from "@nestjs/common";
import { MyScheduleService } from "./my-schedule.service";
import { Get } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "src/common/decorator/roles.decorator";
import { role } from "generated/prisma";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.interface";

@Controller("my-schedule")
export class MyScheduleController {
    constructor(private myScheduleService: MyScheduleService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([role.nurse])
    getMySchedule(
        @CurrentUser() req: JwtPayload
    ) {
        return this.myScheduleService.getMySchedule(req.userId);
    }
}