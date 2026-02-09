import { Controller, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async addReview(@Body() body: { name: string; email?: string; rating: number; comment: string }) {
    return this.reviewsService.addReview(body);
  }
}
