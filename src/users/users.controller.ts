import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../posts/entities/post.entity';
import { CreatePostDto } from '../posts/dto/create-post.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id/posts')
  @UseGuards(ApiKeyGuard)
  async createPost(@Param('id') userId: number, @Body() dto: CreatePostDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = this.postsRepository.create({
      caption: dto.caption,
      likes: dto.likes || 0,
      user,
    });
    return this.postsRepository.save(post);
  }

  @Get(':id/posts')
  @UseGuards(ApiKeyGuard)
  async getPosts(@Param('id') userId: number) {
    const posts = await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['comments'],
    });
    return posts;
  }
}
