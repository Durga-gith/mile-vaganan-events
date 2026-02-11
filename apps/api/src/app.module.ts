import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { EmailService } from './email/email.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  imports: [],
  controllers: [AppController, ServicesController, ReviewsController],
  providers: [PrismaService, ServicesService, EmailService, ReviewsService],
})
export class AppModule {}
