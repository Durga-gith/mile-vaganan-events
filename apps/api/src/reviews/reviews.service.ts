import { Injectable, NotFoundException, Logger } from '@nestjs/common';
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
    try {
      const review = await this.prisma.review.create({
        data: {
          name: (payload.name || '').trim(),
          email: payload.email?.trim(),
          rating: Number(payload.rating),
          comment: (payload.comment || '').trim(),
          approved: false,
          isDeleted: false,
        },
      });

      // Optional email: disable by setting EMAIL_ENABLED=false
      const emailEnabled = (process.env.EMAIL_ENABLED ?? 'true').toLowerCase() !== 'false';
      if (emailEnabled) {
        this.emailService
          .sendReviewEmail(payload as any)
          .catch((e) => this.logger.warn(`sendReviewEmail failed: ${e?.message || e}`));
      }

      return review;
    } catch (e: any) {
      const msg = e?.message || String(e);
      this.logger.error(`addReview error: ${msg}`);

      // Fallback for MongoDB deployments that disallow transactions on single writes
      if (msg.includes('Transactions are not supported')) {
        this.logger.warn('Falling back to raw Mongo insert for Review due to transaction restriction');
        const now = new Date();
        const doc: any = {
          name: (payload.name || '').trim(),
          email: payload.email?.trim(),
          rating: Number(payload.rating),
          comment: (payload.comment || '').trim(),
          approved: false,
          isDeleted: false,
          createdAt: now,
          updatedAt: now,
        };
        const res: any = await (this.prisma as any).$runCommandRaw({
          insert: 'Review',
          documents: [doc],
        });
        // Prisma will map _id ObjectId <-> id string automatically on reads
        return {
          id: String(res?.insertedIds?.[0] ?? ''),
          ...doc,
        };
      }

      throw e;
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
