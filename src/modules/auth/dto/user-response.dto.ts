import { role } from "@prisma/client";

export class UserResponseDto {
    id: string;
    email: string;
    name: string;
    role: role;
}