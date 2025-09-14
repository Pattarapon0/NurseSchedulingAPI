import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    private generateToken(user: users): AuthResponseDto {
        const payload = { userId: user.id, email: user.email, role: user.role , name: user.name};
        const token = this.jwtService.sign(payload, { expiresIn: '24h' });
        return { accessToken: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const user = await this.prisma.users.findUnique({
                where: { email: loginDto.email },
            });
            if (!user || !(await argon2.verify(user.password, loginDto.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return this.generateToken(user);

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            console.error(error);
            throw new InternalServerErrorException('Login failed');
        }
    }

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        try {
            const hashedPassword = await argon2.hash(registerDto.password);

            const user = await this.prisma.users.create({
                data: {
                    email: registerDto.email,
                    password: hashedPassword,
                    name: registerDto.name,
                    role: registerDto.role,
                },
            });
            return this.generateToken(user);
        } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                throw new ConflictException('Email already in use');
            }
            throw new InternalServerErrorException('Registration failed');
        }
    }
}