import { role } from "generated/prisma";


export interface JwtPayload {
    userId: string;
    email: string;
    role: role;
    iat: number;
    exp: number;
}
