import {IsEmail,IsEnum,IsNotEmpty, IsString, MinLength} from 'class-validator';
import { role } from '@prisma/client';
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