import { IsEnum,IsUUID } from "class-validator";
import { LeaveRequestAction } from "../type/LeaveRequestAction";

export class ApproveLeaveRequestsDto {
    @IsEnum(LeaveRequestAction, { message: 'Status must be either approve or reject' })
    status: LeaveRequestAction;
}