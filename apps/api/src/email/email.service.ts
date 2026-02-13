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
  private readonly logoUrl = 'https://mile-vaganan-events.vercel.app/logo.jpg';

  private readonly emailHeader = `
    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #800000;">
      <img src="${this.logoUrl}" alt="Mile Vaganan Events" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px;" />
      <h1 style="color: #d4af37; margin: 0; font-family: 'Playfair Display', serif; font-size: 24px;">Mile Vaganan Events</h1>
      <p style="color: #fffaf0; margin: 5px 0 0; font-style: italic; font-size: 14px;">Crafting Royal Weddings</p>
    </div>
  `;

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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 0;">
        ${this.emailHeader}
        <div style="padding: 20px;">
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
      </div>
    `;

    if (this.resend) {
      try {
        // Send to Admin
        await this.resend.emails.send({
          from: 'Mile Vaganan <onboarding@resend.dev>',
          to: adminEmail,
          subject,
          html,
        });

        // Send Confirmation to Customer
        await this.sendCustomerBookingConfirmation(details);
        
        this.logger.log(`Booking notifications sent for ${details.bookingId}`);
      } catch (error) {
        this.logger.error('Failed to send email via Resend', error);
      }
    } else {
      this.logger.log(`[MOCK EMAIL] To: ${adminEmail}`);
      this.logger.log(`[MOCK EMAIL] Subject: ${subject}`);
    }
  }

  private async sendCustomerBookingConfirmation(details: BookingDetails) {
    const subject = `Booking Confirmed! - Mile Vaganan Events`;
    const html = `
      <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; padding: 0; background-color: #fffaf0;">
        ${this.emailHeader}
        <div style="padding: 40px;">
          <h2 style="color: #800000; text-align: center; border-bottom: 1px solid #d4af37; pb: 10px;">Booking Confirmation</h2>
          
          <p>Dear <strong>${details.customerName}</strong>,</p>
          <p>Thank you for choosing Mile Vaganan Events for your special day. Your booking has been successfully received and is being processed.</p>
          
          <div style="background-color: #fff; border: 1px solid #eee; padding: 20px; margin: 20px 0;">
            <p><strong>Booking ID:</strong> ${details.bookingId}</p>
            <p><strong>Total Amount:</strong> ₹${details.totalAmount}</p>
          </div>

          <h3>Your Selected Services:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${details.items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.serviceName}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${new Date(item.date).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </table>

          <p style="margin-top: 30px;">Our team will contact you shortly to discuss the next steps.</p>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #d4af37; color: #666; font-size: 12px;">
            <p>Mile Vaganan Events | milevagananevents@gmail.com</p>
            <p>© 2026 Mile Vaganan Events. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    if (this.resend) {
      await this.resend.emails.send({
        from: 'Mile Vaganan <onboarding@resend.dev>',
        to: details.customerEmail,
        subject,
        html,
      });
    }
  }

  async sendLeadEmail(details: LeadDetails) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    const subject = `New Booking Enquiry from ${details.name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 0;">
        ${this.emailHeader}
        <div style="padding: 20px;">
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
      </div>
    `;

    if (this.resend) {
      try {
        // Send to Admin
        await this.resend.emails.send({
           from: 'Mile Vaganan <onboarding@resend.dev>',
           to: adminEmail,
           replyTo: details.email,
           subject,
           html,
         });

        // Send Confirmation to Customer
        await this.sendCustomerLeadConfirmation(details);
        
        this.logger.log(`Lead emails sent for ${details.email}`);
      } catch (error) {
        this.logger.error(`FAILED TO SEND EMAIL VIA RESEND: ${error.message}`);
      }
    }
  }

  private async sendCustomerLeadConfirmation(details: LeadDetails) {
    const subject = `Enquiry Received - Mile Vaganan Events`;
    const html = `
      <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; padding: 0; background-color: #fffaf0;">
        ${this.emailHeader}
        <div style="padding: 40px;">
          <h2 style="color: #800000; text-align: center;">Hello ${details.name}!</h2>
          
          <p>Thank you for reaching out to us. We have received your enquiry for your event on <strong>${details.date}</strong>.</p>
          
          <p>Our event experts are reviewing your requirements and will get back to you within 24 hours with a personalized proposal.</p>
          
          <div style="background-color: #fff; border: 1px solid #eee; padding: 20px; margin: 20px 0;">
            <p><strong>Services Interested:</strong> ${details.services.join(', ')}</p>
            <p><strong>Package:</strong> ${details.packageType}</p>
          </div>

          <p>If you have any urgent questions, feel free to reply to this email.</p>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #d4af37; color: #666;">
            <p>Warm regards,<br/>Team Mile Vaganan</p>
          </div>
        </div>
      </div>
    `;

    if (this.resend) {
      await this.resend.emails.send({
        from: 'Mile Vaganan <onboarding@resend.dev>',
        to: details.email,
        subject,
        html,
      });
    }
  }

  async sendReviewEmail(details: ReviewDetails) {
    const adminEmail = process.env.ADMIN_EMAIL || 'milevagananevents@gmail.com';
    const subject = `New Customer Review: ${details.name} (${details.rating}/5)`;
    
    // Add option to approve to site
    const approveUrl = `https://mile-vaganan-events-xaxq.onrender.com/reviews/approve?email=${details.email}&name=${encodeURIComponent(details.name)}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; padding: 0;">
        ${this.emailHeader}
        <div style="padding: 20px;">
          <h2 style="color: #800000; text-align: center;">New Customer Review</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${details.name}</p>
            ${details.email ? `<p><strong>Email:</strong> ${details.email}</p>` : ''}
            <p><strong>Rating:</strong> ${details.rating}/5</p>
            <p><strong>Comment:</strong><br/>${details.comment}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p>Would you like to feature this review on your website?</p>
            <a href="${approveUrl}" style="background-color: #d4af37; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Add Customer Details to Site
            </a>
          </div>
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
        this.logger.log(`Review email sent to ${adminEmail} with approval option`);
      } catch (error) {
        this.logger.error('Failed to send review email via Resend', error);
      }
    }
  }

}
