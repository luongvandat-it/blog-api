import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { AuthDTO } from 'src/auth/dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Post('showInfo')
  @ApiTags(`showInfo`)
  @ApiBody({ type: AuthDTO })
  showInfo(@Body() authDTO: AuthDTO) {
    return this.userService.showInfo(authDTO)
  }
}