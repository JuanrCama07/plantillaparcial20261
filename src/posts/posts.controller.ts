import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/comments')
  @UseGuards(ApiKeyGuard)
  createComment(@Param('id') postId: number, @Body() dto: CreateCommentDto) {
    return this.postsService.createComment(postId, dto);
  }
}
