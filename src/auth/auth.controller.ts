import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserLoginWithEmailDto } from "./dto/UserLoginWithEmail.dto";
import { AuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async loginWithEmailAndPassword(
    @Body() userLoginWithEmailDto: UserLoginWithEmailDto
  ) {
    return this.authService.loginWithEmailAndPassword(userLoginWithEmailDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Get("verify_token")
  getProfile(@Request() req) {
    return req.user;
  }
}
