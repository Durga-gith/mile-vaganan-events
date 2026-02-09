import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly emailService: EmailService) {}

  async addReview(payload: { name: string; email?: string; rating: number; comment: string }) {
    await this.emailService.sendReviewEmail(payload);
    return { ok: true };
  }
}
