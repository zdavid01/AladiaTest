import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto, UserResponseDto } from '@app/common/dtos/user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,  // Inject JWT
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { name, email, password } = createUserDto;
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ 
      name, 
      email, 
      password: hashed 
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().select('-password');
    return users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
    }));
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}