import { Type } from "class-transformer";
import { IsDate, IsDateString, Validate } from "class-validator";
import { EndAfterStartConstraint } from "src/common/validator";
import { NotInPastConstraint } from "src/common/validator";


export class CreateShiftDto {
    @Type(() => Date)
    @IsDate()
    date: Date;
    

    @Type(() => Date)
    @IsDate()
    @Validate(NotInPastConstraint)
    startTime: Date;

    @Type(() => Date)
     @IsDate()
    @Validate(EndAfterStartConstraint)
    endTime: Date;
}