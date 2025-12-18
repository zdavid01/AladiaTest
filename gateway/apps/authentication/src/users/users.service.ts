import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from '@app/common/dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.repository.create(createUserDto);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.repository.findAll();
  }
}