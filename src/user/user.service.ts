import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(public prismaService: PrismaService) { }

    async showInfo(authDTO: AuthDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        })

        delete user.hashedPassword
        return user
    }
}