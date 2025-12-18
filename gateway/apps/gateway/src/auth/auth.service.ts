import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UserResponseDto } from '@app/common/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.client.send('register_user', createUserDto).toPromise();
  }

  async getUsers(): Promise<UserResponseDto[]> {
    return this.client.send('get_users', {}).toPromise();
  }
}