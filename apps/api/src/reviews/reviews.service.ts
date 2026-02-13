import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async addReview(payload: { name: string; email?: string; rating: number; comment: string }) {
    // Save to database
    const review = await this.prisma.review.create({
      data: {
        name: payload.name,
        email: payload.email,
        rating: payload.rating,
        comment: payload.comment,
        approved: false,
        isDeleted: false,
      },
    });

    // Send notification to admin
    await this.emailService.sendReviewEmail(payload);
    
    return review;
  }

  async getApprovedReviews() {
    return this.prisma.review.findMany({
      where: {
        approved: true,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async approveReviewByEmail(email: string) {
    const review = await this.prisma.review.findFirst({
      where: { email },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id: review.id },
      data: { approved: true },
    });
  }

  async deleteReview(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
