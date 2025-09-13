import { Controller, Post, Body, UseGuards, Request, HttpException, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException, Param, Get, Patch } from "@nestjs/common"
import { LeaveRequestsService } from "./leave-requests.service"
import { CreateLeaveRequestsDto } from "./dto/create-leave-requests.dto"
import { ApproveLeaveRequestsDto } from "./dto/approve-leave-requests.dto"
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { role } from "@prisma/client";
import { Roles } from "../../common/decorator/roles.decorator"
import { RolesGuard } from "../../common/guards/roles.guard"
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.interface";

@Controller('leave-requests')
export class LeaveRequestsController {
    constructor(private leaveRequestsService: LeaveRequestsService) { }
    
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([role.head_nurse])
    async getAllLeaveRequests() {
        return this.leaveRequestsService.getAllLeaveRequests();
    }

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles([role.nurse])
    async createLeaveRequest(
        @Body() dto: CreateLeaveRequestsDto,
        @CurrentUser() req
    ) {
        const userId = req.userId;
        return this.leaveRequestsService.createLeaveRequest(dto, userId);
    }

    @Patch(':id/approve')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([role.head_nurse])
    async approveLeaveRequest(
        @Param('id') id: string,
        @Body() dto: ApproveLeaveRequestsDto,
        @CurrentUser() req: JwtPayload
    ) {
        return this.leaveRequestsService.patchLeaveRequestStatus(id, dto.status, req.name);
    }


}