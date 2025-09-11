import { IsUUID } from "class-validator";

export class CreateShiftAssignmentDto {
    @IsUUID()
    userId: string;

    @IsUUID()
    shiftId: string;
}