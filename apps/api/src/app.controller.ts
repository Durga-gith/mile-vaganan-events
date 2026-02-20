import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return 'Mile Vaganan Events API is running! 🚀';
  }

  @Get('health/db')
  async healthDb() {
    try {
      // For MongoDB provider, ping the server
      const res = await (this.prisma as any).$runCommandRaw({ ping: 1 });
      return { ok: true, ping: res?.ok === 1 ? 'ok' : 'unknown' };
    } catch (e: any) {
      return { ok: false, error: e?.message || String(e) };
    }
  }
}
