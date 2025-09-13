import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, BadRequestException, NotFoundException, HttpException, ConflictException } from "@nestjs/common/exceptions";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateLeaveRequestsDto } from "./dto/create-leave-requests.dto";
import { LeaveRequestAction } from "./type/LeaveRequestAction";
import { leave_status, role } from "@prisma/client";

@Injectable()
export class LeaveRequestsService {
    constructor(private prisma: PrismaService) { }

    async createLeaveRequest(dto: CreateLeaveRequestsDto, currentUserId: string) {
        try {
            const shiftAssignment = await this.prisma.shift_assignments.findUnique({
                where: { id: dto.shiftAssignmentId },
                include: { user: true, shift: true }
            });

            if (!shiftAssignment) {
                throw new NotFoundException("Shift assignment not found");
            }
            if (shiftAssignment.shift.start_time < new Date()) {
                throw new BadRequestException("Cannot request leave for a shift in the past");
            }
            if (shiftAssignment.user.role !== role.nurse) {
                throw new BadRequestException("Only nurses can request leave");
            }
            if (shiftAssignment.user_id !== currentUserId) {
                throw new BadRequestException("You can only request leave for your own shifts");
            }
            const leaveRequest = await this.prisma.leave_requests.create({
                data: {
                    shift_assignment_id: dto.shiftAssignmentId,
                    reason: dto.reason,
                    status: leave_status.pending,
                },
            });
            return leaveRequest;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            if (error.code === 'P2002') {
                throw new ConflictException('Leave request already exists for this shift assignment');
            }
            if (error.code === 'P2003') {
                throw new BadRequestException('Invalid shift assignment reference');
            }

            throw new InternalServerErrorException("Error creating leave request");
        }
    }
    async getAllLeaveRequests() {
        try {
            return await this.prisma.leave_requests.findMany({
                include: {
                    shift_assignment: {
                        include: {
                            user: { select: { id: true, name: true, email: true } },
                            shift: true
                        }
                    },
                    approved_by_user: { select: { name: true, email: true } }
                },
                orderBy: { created_at: 'desc' }
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Error retrieving leave requests");
        }
    }

    async patchLeaveRequestStatus(leaveRequestId: string, status: LeaveRequestAction, approvedBy: string) {
        try {
            const leaveRequest = await this.prisma.leave_requests.findUnique({
                where: { id: leaveRequestId },
                include: { shift_assignment: { include: { shift: true } } }
            });

            if (!leaveRequest) {
                throw new NotFoundException("Leave request not found");
            }
            if (!leaveRequest.shift_assignment) {
                throw new NotFoundException("Associated shift assignment not found");
            }
            if (!leaveRequest.shift_assignment.shift) {
                throw new NotFoundException("Associated shift not found");
            }
            if (leaveRequest.shift_assignment.shift.start_time < new Date()) {
                throw new BadRequestException('Cannot approve/reject leave for shifts that have already started');
            }
            if (leaveRequest.status !== leave_status.pending) {
                throw new ConflictException(`Leave request is already ${leaveRequest.status}`);
            }

            const updatedLeaveRequest = await this.prisma.leave_requests.update({
                where: { id: leaveRequest.id },
                data: {
                    status: status === LeaveRequestAction.APPROVE ? leave_status.approved : leave_status.rejected,
                    approved_by: approvedBy
                },
                include: {
                    shift_assignment: {
                        include: {
                            user: { select: { id: true, name: true, email: true } },
                            shift: { select: { id: true, date: true, start_time: true, end_time: true } }
                        }
                    },
                    approved_by_user: { select: { name: true, email: true } }
                }
            });

            return updatedLeaveRequest;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            if (error.code === 'P2025') {
                throw new NotFoundException('Leave request not found');
            }
            throw new InternalServerErrorException("Error updating leave request status");
        }
    }
}
