import { Controller, Post, Body, Get, Query, Delete, Param, Headers, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  private readonly logger = new Logger(ReviewsController.name);

  @Post()
  async addReview(@Body() body: { name: string; email?: string; rating: number; comment: string }) {
    try {
      return await this.reviewsService.addReview(body);
    } catch (e: any) {
      const msg = e?.message || String(e);
      this.logger.error(`POST /reviews failed: ${msg}`);
      throw new BadRequestException(`Failed to add review: ${msg}`);
    }
  }

  @Get()
  async getApprovedReviews() {
    return this.reviewsService.getApprovedReviews();
  }

  @Get('approve')
  async approveReview(
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    await this.reviewsService.approveReviewByEmail(email);

    return `
      <html>
        <body style="font-family: Arial; text-align:center; padding:40px; background-color: #F9F6F1;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; border: 2px solid #C5A028; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h2 style="color: #6A1B1B;">✅ Review Approved Successfully</h2>
            <p style="font-size: 18px; color: #333;">The review from <strong>${name}</strong> has been added to your website.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">Mile Vaganan Events - Royal Wedding Planning</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  @Delete('admin/delete/:id')
  async deleteReview(
    @Param('id') id: string,
    @Headers('admin-secret') adminSecret: string,
  ) {
    if (adminSecret !== process.env.ADMIN_SECRET) {
      throw new UnauthorizedException('Access denied');
    }

    await this.reviewsService.deleteReview(id);
    return { message: 'Review deleted successfully' };
  }
}
