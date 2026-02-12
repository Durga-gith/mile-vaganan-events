import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces for Render
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
