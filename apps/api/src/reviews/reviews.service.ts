import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}
  private readonly logger = new Logger(ReviewsService.name);

  async addReview(payload: { name: string; email?: string; rating: number; comment: string }) {
    const client = new MongoClient(process.env.DATABASE_URL!);
    try {
      await client.connect();
      const db = client.db('milevaganam');
      const collection = db.collection('Review');
      const review = {
        name: (payload.name || '').trim(),
        email: payload.email?.trim(),
        rating: Number(payload.rating),
        comment: (payload.comment || '').trim(),
        approved: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await collection.insertOne(review as any);
      return {
        id: result.insertedId.toString(),
        ...review,
      };
    } catch (e: any) {
      this.logger.error(`Native Mongo insert failed: ${e?.message || e}`);
      throw e;
    } finally {
      await client.close();
    }
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
