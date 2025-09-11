import {IsEmail,IsEnum,IsNotEmpty, IsString, MinLength} from 'class-validator';
import { role } from 'generated/prisma';
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string;

    @IsEnum(role)
    role: role;

    @IsNotEmpty()
    @IsString()
    name:string;
}