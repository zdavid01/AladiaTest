import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UserResponseDto } from '@app/common/dtos/user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })  // 5 registrations per minute per IP
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Get('users')
  async getUsers(): Promise<UserResponseDto[]> {
    return this.authService.getUsers();
  }

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })  // 10 login attempts per minute per IP
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}