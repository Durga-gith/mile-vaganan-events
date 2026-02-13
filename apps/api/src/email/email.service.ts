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

  private getEmailHeader(customerName?: string) {
    const title = customerName ? `Thank you, ${customerName} 💍` : 'Mile Vaganan Events';
    return `
      <div style="text-align: center; margin-bottom: 30px; padding: 50px 20px; background-color: #F9F6F1; border-bottom: 4px solid #C5A028;">
        <!-- Gold Stamp Logo Section -->
        <div style="display: inline-block; position: relative; margin-bottom: 25px;">
          <div style="
            width: 120px; 
            height: 120px; 
            background: white; 
            border-radius: 50%; 
            border: 3px solid #C5A028;
            box-shadow: 0 0 20px rgba(197, 160, 40, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin: 0 auto;
          ">
            <img src="${this.logoUrl}" alt="Mile Vaganan Events" width="100" height="100" style="display: block; width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" />
          </div>
        </div>
        
        <h1 style="color: #6A1B1B; margin: 0; font-family: 'Playfair Display', 'Georgia', serif; font-size: 32px; text-transform: none; letter-spacing: 1px; font-weight: bold;">
          ${title}
        </h1>
        <div style="width: 50px; height: 2px; background: #C5A028; margin: 20px auto;"></div>
        <p style="color: #6A1B1B; margin: 0; font-style: italic; font-size: 18px; font-family: 'Georgia', serif; letter-spacing: 0.5px; opacity: 0.9;">
          Crafting Royal Weddings & Memorable Events
        </p>
      </div>
    `;
  }

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
      <div style="font-family: 'Playfair Display', 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 1px solid #C5A028; padding: 0; background-color: #F9F6F1; color: #6A1B1B;">
        ${this.getEmailHeader()}
        <div style="padding: 30px;">
          <h2 style="color: #6A1B1B; text-align: center; font-family: 'Playfair Display', serif;">New Booking Alert</h2>
          <p><strong>Customer Name:</strong> ${details.customerName}</p>
          <p><strong>Email:</strong> ${details.customerEmail}</p>
          <p><strong>Phone:</strong> ${details.customerPhone}</p>
          <hr style="border: 0; border-top: 1px solid #C5A028; margin: 20px 0;" />
          
          <h3 style="color: #6A1B1B;">Booked Services</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #C5A028; color: white;">
              <th style="padding: 12px; text-align: left;">Service</th>
              <th style="padding: 12px; text-align: right;">Price</th>
              <th style="padding: 12px; text-align: right;">Date</th>
            </tr>
            ${details.items.map(item => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #C5A028;">${item.serviceName}</td>
                <td style="padding: 12px; border-bottom: 1px solid #C5A028; text-align: right;">₹${item.price}</td>
                <td style="padding: 12px; border-bottom: 1px solid #C5A028; text-align: right;">${new Date(item.date).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </table>
          
          <div style="text-align: right; margin: 30px 0;">
            <h3 style="color: #6A1B1B; margin: 0;">Total Amount: <span style="color: #C5A028;">₹${details.totalAmount}</span></h3>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #C5A028; color: #6A1B1B; font-size: 12px; opacity: 0.8;">
            <p>This is an automated notification from Mile Vaganan Events.</p>
            <p>© 2026 Mile Vaganan Events. All rights reserved.</p>
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
    const subject = `✨ Booking Confirmation – Mile Vaganan Events`;
    const html = `
      <div style="font-family: 'Playfair Display', 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 1px solid #C5A028; padding: 0; background-color: #F9F6F1; color: #6A1B1B;">
        ${this.getEmailHeader(details.customerName)}
        <div style="padding: 40px;">
          <p style="font-size: 18px; line-height: 1.6;">We have successfully received your booking request.</p>
          
          <div style="background-color: white; border: 1px solid #C5A028; padding: 25px; margin: 30px 0; border-radius: 4px;">
            <h3 style="color: #6A1B1B; margin-top: 0; border-bottom: 1px solid #C5A028; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Booking Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${details.items.map(item => `
                <li style="padding: 10px 0; border-bottom: 1px dashed #eee; display: flex; justify-content: space-between;">
                  <span><strong>• Service:</strong> ${item.serviceName}</span>
                </li>
                <li style="padding: 10px 0; border-bottom: 1px dashed #eee;">
                  <span><strong>• Event Date:</strong> ${new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </li>
              `).join('')}
              <li style="padding: 10px 0;">
                <span><strong>• Phone:</strong> ${details.customerPhone}</span>
              </li>
            </ul>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="font-size: 18px; color: #6A1B1B; font-style: italic;">We’re honored to be part of your special day.<br/>Our team will contact you shortly.</p>
            <p style="margin-top: 25px; font-weight: bold; color: #6A1B1B;">Warm Regards,<br/><span style="color: #C5A028;">Mile Vaganan Events</span></p>
          </div>
          
          <div style="text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid #C5A028; color: #6A1B1B; font-size: 13px;">
            <p style="margin-bottom: 5px;"><strong>Contact:</strong> <a href="mailto:milevagananevents@gmail.com" style="color: #6A1B1B; text-decoration: none;">milevagananevents@gmail.com</a></p>
            <p style="margin-bottom: 20px;"><strong>WhatsApp/Phone:</strong> +91 93633 42426</p>
            <p style="opacity: 0.7; font-size: 11px;">© 2026 Mile Vaganan Events. All rights reserved.</p>
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
      <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; padding: 0; background-color: #fffaf0;">
        ${this.getEmailHeader()}
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
    const subject = `✨ Enquiry Received - Mile Vaganan Events`;
    const html = `
      <div style="font-family: 'Playfair Display', 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 1px solid #C5A028; padding: 0; background-color: #F9F6F1; color: #6A1B1B;">
        ${this.getEmailHeader(details.name)}
        <div style="padding: 40px;">
          <p style="font-size: 18px; line-height: 1.6;">We have successfully received your enquiry regarding your upcoming event.</p>
          
          <div style="background-color: white; border: 1px solid #C5A028; padding: 25px; margin: 30px 0; border-radius: 4px;">
            <h3 style="color: #6A1B1B; margin-top: 0; border-bottom: 1px solid #C5A028; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Enquiry Summary</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 10px 0; border-bottom: 1px dashed #eee;">
                <span><strong>• Package:</strong> ${details.packageType}</span>
              </li>
              <li style="padding: 10px 0; border-bottom: 1px dashed #eee;">
                <span><strong>• Event Date:</strong> ${details.date}</span>
              </li>
              <li style="padding: 10px 0; border-bottom: 1px dashed #eee;">
                <span><strong>• City:</strong> ${details.city}</span>
              </li>
              <li style="padding: 10px 0;">
                <span><strong>• Services:</strong> ${details.services.join(', ')}</span>
              </li>
            </ul>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="font-size: 18px; color: #6A1B1B; font-style: italic;">We’re honored to be considered for your special day.<br/>Our team will contact you shortly to discuss your royal celebration.</p>
            <p style="margin-top: 25px; font-weight: bold; color: #6A1B1B;">Warm Regards,<br/><span style="color: #C5A028;">Mile Vaganan Events</span></p>
          </div>
          
          <div style="text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid #C5A028; color: #6A1B1B; font-size: 13px;">
            <p style="margin-bottom: 5px;"><strong>Contact:</strong> <a href="mailto:milevagananevents@gmail.com" style="color: #6A1B1B; text-decoration: none;">milevagananevents@gmail.com</a></p>
            <p style="margin-bottom: 20px;"><strong>WhatsApp/Phone:</strong> +91 93633 42426</p>
            <p style="opacity: 0.7; font-size: 11px;">© 2026 Mile Vaganan Events. All rights reserved.</p>
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
    const subject = `New Royal Review: ${details.rating} Stars from ${details.name}`;
    
    // Add option to approve to site
    const approveUrl = `https://mile-vaganan-events-xaxq.onrender.com/reviews/approve?email=${details.email}&name=${encodeURIComponent(details.name)}`;

    const html = `
      <div style="font-family: 'Playfair Display', 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 1px solid #C5A028; padding: 0; background-color: #F9F6F1; color: #6A1B1B;">
        ${this.getEmailHeader()}
        <div style="padding: 30px;">
          <h2 style="color: #6A1B1B; text-align: center; border-bottom: 1px solid #C5A028; padding-bottom: 10px;">New Customer Review</h2>
          
          <div style="background-color: #fff; padding: 25px; border: 1px solid #C5A028; border-radius: 4px; margin: 20px 0; box-shadow: 0 2px 10px rgba(197, 160, 40, 0.1);">
            <div style="text-align: center; margin-bottom: 15px;">
              <span style="color: #C5A028; font-size: 24px;">${'★'.repeat(details.rating)}${'☆'.repeat(5 - details.rating)}</span>
            </div>
            <p style="margin: 5px 0;"><strong>Customer:</strong> ${details.name}</p>
            ${details.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${details.email}</p>` : ''}
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #C5A028;">
              <p style="font-style: italic; color: #6A1B1B; line-height: 1.6; font-size: 16px;">"${details.comment}"</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 35px; background-color: white; padding: 25px; border-radius: 8px; border: 1px solid #C5A028;">
            <p style="margin-bottom: 20px; font-weight: bold; color: #6A1B1B; font-size: 18px;">Display this review on your website?</p>
            <a href="${approveUrl}" style="background-color: #6A1B1B; color: #C5A028; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; border: 2px solid #C5A028; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-transform: uppercase; letter-spacing: 1px;">
              Approve & Add to Website
            </a>
            ${details.email ? `
            <div style="margin-top: 20px;">
              <a href="mailto:${details.email}" style="color: #6A1B1B; text-decoration: underline; font-size: 14px;">Contact customer directly</a>
            </div>` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 40px; color: #6A1B1B; font-size: 12px; border-top: 1px solid #C5A028; padding-top: 20px; opacity: 0.8;">
            <p>© 2026 Mile Vaganan Events | milevagananevents@gmail.com</p>
          </div>
        </div>
      </div>
    `;

    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: 'Mile Vaganan Admin <onboarding@resend.dev>',
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
