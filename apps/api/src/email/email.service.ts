import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dns from 'node:dns';

// Force IPv4 globally for the Node process to resolve ENETUNREACH on Render
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

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
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    // In production, these should be env vars.
    // Fallback to console logging if credentials aren't present.
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s/g, '') : '';
      
      // We are switching back to 587 but with stricter TLS and IPv4 forcing
      // Port 465 failed on both IPv4 and IPv6 in previous logs
      const host = 'smtp.gmail.com';
      const port = 587;
      const secure = false;

      this.logger.log(`SMTP Ultimate Strategy: Host=${host}, Port=${port}, User=${process.env.SMTP_USER}`);
      this.logger.log(`SMTP Pass Length: ${smtpPass.length} characters`);
      
      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: smtpPass,
        },
        // Force IPv4 again here
        family: 4,
        tls: {
          // Some cloud providers need this to bypass certificate issues in their proxy
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2'
        },
        connectionTimeout: 60000,
        greetingTimeout: 60000,
        socketTimeout: 60000,
        debug: true,
        logger: true,
      } as any);

      // Detailed verification
      this.transporter.verify((error, success) => {
        if (error) {
          const err = error as any;
          this.logger.error('SMTP VERIFICATION FAILED! Details:');
          this.logger.error(`Code: ${err.code}`);
          this.logger.error(`Message: ${err.message}`);
          this.logger.error(`Stack: ${err.stack}`);
        } else {
          this.logger.log('SMTP CONNECTION SUCCESSFUL - Ready to send emails');
        }
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

    if (this.transporter) {
      try {
        this.logger.log(`Attempting to send lead email from ${process.env.SMTP_USER} to ${adminEmail}`);
        const info = await this.transporter.sendMail({
          from: `"Mile Vaganan System" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          replyTo: details.email, // Allow admin to reply directly to the customer
          subject,
          html,
        });
        this.logger.log(`Lead email sent successfully: ${info.messageId} to ${adminEmail}`);
      } catch (error) {
        this.logger.error(`Failed to send lead email: ${error.message}`, error.stack);
        throw error; // Re-throw so the backend returns a 500 and we know it failed
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

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: `"Mile Vaganan System" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject,
          html,
        });
        this.logger.log(`Review email sent to ${adminEmail}`);
      } catch (error) {
        this.logger.error('Failed to send review email', error);
      }
    } else {
      this.logger.log(`[MOCK REVIEW EMAIL] To: ${adminEmail} - from ${details.name}`);
    }
  }
}
