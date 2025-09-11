import { IsUUID, IsString} from "class-validator";

export class CreateLeaveRequestsDto {

    @IsUUID()
    shiftAssignmentId: string;

    @IsString()
    reason: string;
}