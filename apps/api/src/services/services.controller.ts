import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(@Query('lang') lang: string) {
    return this.servicesService.findAll(lang);
  }

  @Post('book')
  createBooking(@Body() body: any) {
    return this.servicesService.createBooking(body);
  }

  @Post('lead')
  createLead(@Body() body: any) {
    console.log('Received lead request:', body.email);
    return this.servicesService.createLead(body);
  }
}
