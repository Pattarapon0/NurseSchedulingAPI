import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security headers (must be first)
  app.use(helmet());
  
  // Compression middleware for better performance
  app.use(compression());
  
  // CORS configuration for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  
  // API prefix
  app.setGlobalPrefix('api/v1');
  
  // Global validation pipe - makes your DTOs work!
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // Strip unknown properties
    forbidNonWhitelisted: true, // Throw error for unknown properties
    transform: true,           // Auto-transform payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: true // Convert string to number automatically
    }
  }));
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Hospital Scheduling API running on port ${port}`);
  console.log(`📱 API available at: http://localhost:${port}/api/v1`);
}

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = bootstrap;
} else {
  bootstrap();
}
