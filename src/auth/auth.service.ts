import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const apiKey = randomUUID();

    const user = this.usersRepository.create({
      username: dto.name,
      apiKey,
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      apiKey: savedUser.apiKey,
      name: dto.name,
      email: dto.email,
    };
  }
}
