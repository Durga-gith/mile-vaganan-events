import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface BookingDetails {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  items: Array<{
    serviceName: string;
    price: number;
    date: Date;
  }>;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    // In production, these should be env vars.
    // Fallback to console logging if credentials aren't present.
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      this.logger.warn('SMTP credentials not found. Emails will be logged to console only.');
    }
  }

  async sendBookingNotification(details: BookingDetails) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    
    const subject = `New Booking Received: ${details.customerName} - ${details.bookingId}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 20px;">
        <h2 style="color: #800000; text-align: center;">New Booking Alert</h2>
        <p><strong>Customer Name:</strong> ${details.customerName}</p>
        <p><strong>Email:</strong> ${details.customerEmail}</p>
        <p><strong>Phone:</strong> ${details.customerPhone}</p>
        <hr style="border-color: #d4af37;" />
        
        <h3>Booked Services</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f4cf57;">
            <th style="padding: 8px; text-align: left;">Service</th>
            <th style="padding: 8px; text-align: right;">Price</th>
            <th style="padding: 8px; text-align: right;">Date</th>
          </tr>
          ${details.items.map(item => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.serviceName}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${new Date(item.date).toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </table>
        
        <h3 style="text-align: right; color: #800000;">Total Amount: ₹${details.totalAmount}</h3>
        
        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>This is an automated notification from Mile Vaganan Events.</p>
        </div>
      </div>
    `;

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: `"Mile Vaganan System" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject,
          html,
        });
        this.logger.log(`Booking notification sent to ${adminEmail}`);
      } catch (error) {
        this.logger.error('Failed to send email', error);
      }
    } else {
      // Mock sending for development/demo
      this.logger.log(`[MOCK EMAIL] To: ${adminEmail}`);
      this.logger.log(`[MOCK EMAIL] Subject: ${subject}`);
      this.logger.log(`[MOCK EMAIL] Body Preview: New booking from ${details.customerName} for ₹${details.totalAmount}`);
    }
  }
}
