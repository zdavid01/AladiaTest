import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from '@app/common/dtos/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('register_user')
  async register(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('get_users')
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }
}