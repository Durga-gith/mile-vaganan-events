import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

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

interface LeadDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  packageType: string;
  services: string[];
  notes?: string;
}

interface ReviewDetails {
  name: string;
  email?: string;
  rating: number;
  comment: string;
}

@Injectable()
export class EmailService {
  private resend: Resend | null = null;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log('Resend Email Service Initialized');
    } else {
      this.logger.warn('RESEND_API_KEY not found. Emails will be logged to console only.');
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

    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: 'Mile Vaganan <onboarding@resend.dev>',
          to: adminEmail,
          subject,
          html,
        });
        this.logger.log(`Booking notification sent to ${adminEmail} via Resend`);
      } catch (error) {
        this.logger.error('Failed to send email via Resend', error);
      }
    } else {
      this.logger.log(`[MOCK EMAIL] To: ${adminEmail}`);
      this.logger.log(`[MOCK EMAIL] Subject: ${subject}`);
      this.logger.log(`[MOCK EMAIL] Body Preview: New booking from ${details.customerName} for ₹${details.totalAmount}`);
    }
  }

  async sendLeadEmail(details: LeadDetails) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    const subject = `New Booking Enquiry from ${details.name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 20px;">
        <h2 style="color: #800000; text-align: center;">New Booking Enquiry</h2>
        <p><strong>Name:</strong> ${details.name}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Phone:</strong> ${details.phone}</p>
        <p><strong>City:</strong> ${details.city}</p>
        <p><strong>Wedding Date:</strong> ${details.date}</p>
        <p><strong>Package:</strong> ${details.packageType}</p>
        <p><strong>Interested Services:</strong> ${details.services.join(', ')}</p>
        ${details.notes ? `<p><strong>Notes:</strong><br/>${details.notes}</p>` : ''}
      </div>
    `;

    if (this.resend) {
      try {
        this.logger.log(`Attempting to send lead email for ${details.email} via Resend...`);
        const result = await this.resend.emails.send({
           from: 'Mile Vaganan <onboarding@resend.dev>',
           to: adminEmail,
           replyTo: details.email,
           subject,
           html,
         });
        this.logger.log(`Lead email sent successfully! ID: ${result.data?.id}`);
      } catch (error) {
        this.logger.error(`FAILED TO SEND EMAIL VIA RESEND: ${error.message}`);
      }
    } else {
      this.logger.log(`[MOCK LEAD EMAIL] To: ${adminEmail} - from ${details.name}`);
    }
  }

  async sendReviewEmail(details: ReviewDetails) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    const subject = `New Customer Review from ${details.name} (${details.rating}/5)`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 20px;">
        <h2 style="color: #800000; text-align: center;">New Customer Review</h2>
        <p><strong>Name:</strong> ${details.name}</p>
        ${details.email ? `<p><strong>Email:</strong> ${details.email}</p>` : ''}
        <p><strong>Rating:</strong> ${details.rating}/5</p>
        <p><strong>Comment:</strong><br/>${details.comment}</p>
      </div>
    `;

    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: 'Mile Vaganan <onboarding@resend.dev>',
          to: adminEmail,
          subject,
          html,
        });
        this.logger.log(`Review email sent to ${adminEmail} via Resend`);
      } catch (error) {
        this.logger.error('Failed to send review email via Resend', error);
      }
    } else {
      this.logger.log(`[MOCK REVIEW EMAIL] To: ${adminEmail} - from ${details.name}`);
    }
  }
}
