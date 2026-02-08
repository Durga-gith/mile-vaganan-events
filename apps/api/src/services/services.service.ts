import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async findAll(lang: string = 'en') {
    const services = await this.prisma.vendorService.findMany({
      include: {
        translations: true,
        category: {
          include: {
            translations: true,
          },
        },
      },
    });

    // Transform data to return specific language or fallback
    return services.map((service) => {
      const translation = service.translations.find((t) => t.language === lang) || service.translations[0];
      const categoryTranslation = service.category.translations.find((t) => t.language === lang) || service.category.translations[0];

      return {
        id: service.id,
        price: service.price,
        city: service.city,
        name: translation?.name || 'No Name',
        description: translation?.description || '',
        category: categoryTranslation?.name || 'Uncategorized',
      };
    });
  }

  async createBooking(data: any) {
     // Fetch user details to include in email
     const user = await this.prisma.user.findUnique({ where: { id: data.userId } });

     const booking = await this.prisma.booking.create({
       data: {
         userId: data.userId,
         totalAmount: data.totalAmount,
         status: 'PENDING',
         items: {
           create: data.items.map((item) => ({
             serviceId: item.serviceId,
             price: item.price,
             date: new Date(item.date),
           })),
         },
       },
       include: {
         items: {
           include: {
             service: {
               include: {
                 translations: true
               }
             }
           }
         }
       }
     });

     // Send Email Notification
     if (user) {
       await this.emailService.sendBookingNotification({
         bookingId: booking.id,
         customerName: user.name || 'Valued Customer',
         customerEmail: user.email,
         customerPhone: user.phone || 'N/A',
         totalAmount: Number(booking.totalAmount),
         items: booking.items.map(item => {
           // Find English translation or fallback to first
           const trans = item.service.translations.find(t => t.language === 'en') || item.service.translations[0];
           return {
             serviceName: trans?.name || 'Service',
             price: Number(item.price),
             date: item.date
           };
         })
       });
     }

     return booking;
  }
}
