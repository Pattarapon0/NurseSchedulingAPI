import { role } from "generated/prisma";

export class UserResponseDto {
    id: string;
    email: string;
    name: string;
    role: role;
}