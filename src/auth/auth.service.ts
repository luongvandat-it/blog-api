import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async register(authDTO: AuthDTO) {
        const hashedPassword = await argon.hash(authDTO.password)
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: ''
                },
                select: {
                    id: true,
                    email: true,
                    createAt: true
                }
            })
            return await this.signJwtToken(user.id, user.email)
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        })

        if (!user) {
            throw new ForbiddenException(`User is not valid`)
        }

        const passwordMatched = await argon.verify(user.hashedPassword, authDTO.password)

        if (!passwordMatched) {
            throw new ForbiddenException(`Email or password wrong`)
        }

        delete user.hashedPassword
        return await this.signJwtToken(user.id, user.email)
    }

    async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
        const payload = { sub: userId, email }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            accessToken: jwtString
        }
    }
}