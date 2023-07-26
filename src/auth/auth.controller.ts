import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(`register`)
  @ApiTags(`register`)
  @ApiBody({ type: AuthDTO })
  register(@Body() authDTO: AuthDTO) {
    return this.authService.register(authDTO)
  }

  @Post(`login`)
  @ApiTags(`login`)
  @ApiBody({ type: AuthDTO })
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO)
  }
}