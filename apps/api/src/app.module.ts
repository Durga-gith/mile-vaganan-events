import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [],
  controllers: [ServicesController],
  providers: [PrismaService, ServicesService, EmailService],
})
export class AppModule {}
