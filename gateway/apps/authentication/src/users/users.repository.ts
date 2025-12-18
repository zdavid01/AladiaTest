import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto, UserResponseDto } from '@app/common/dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = new this.userModel(createUserDto);
    const saved = await user.save();
    return { id: saved._id.toString(), name: saved.name, email: saved.email };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();
    return users.map(u => ({ id: u._id.toString(), name: u.name, email: u.email }));
  }
}