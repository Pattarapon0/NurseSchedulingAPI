import { role } from "@prisma/client";


export interface JwtPayload {
    userId: string;
    email: string;
    role: role;
    iat: number;
    exp: number;
    name: string;
}
