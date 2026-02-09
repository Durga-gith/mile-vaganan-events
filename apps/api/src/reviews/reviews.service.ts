import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly emailService: EmailService) {}

  async addReview(payload: { name: string; email?: string; rating: number; comment: string }) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    const subject = `New Customer Review from ${payload.name} (${payload.rating}/5)`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 20px;">
        <h2 style="color: #800000; text-align: center;">New Customer Review</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        ${payload.email ? `<p><strong>Email:</strong> ${payload.email}</p>` : ''}
        <p><strong>Rating:</strong> ${payload.rating}/5</p>
        <p><strong>Comment:</strong><br/>${payload.comment}</p>
      </div>
    `;

    if ((this.emailService as any).transporter) {
      await (this.emailService as any).transporter.sendMail({
        from: `"Mile Vaganan System" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject,
        html,
      });
    }

    return { ok: true };
  }
}
