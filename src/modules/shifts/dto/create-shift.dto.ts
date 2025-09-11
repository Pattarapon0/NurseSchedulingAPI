import { Type } from "class-transformer";
import { IsISO8601,MinDate, Validate } from "class-validator";
import { EndAfterStartConstraint } from "src/common/validator";
import { NotInPastConstraint } from "src/common/validator";


export class CreateShiftDto {
    @IsISO8601()
    @Type(() => Date)
    date: Date;
    
    @IsISO8601()
    @Type(() => Date)
    @Validate(NotInPastConstraint)
    startTime: Date;

    @IsISO8601()
    @Type(() => Date)
    @Validate(EndAfterStartConstraint)
    endTime: Date;
}