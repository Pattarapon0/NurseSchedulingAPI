import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../dist/src/app.module';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

export const handler = async (event: any, context: any) => {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
    
    const expressApp = app.getHttpAdapter().getInstance();
    server = serverlessExpress({ app: expressApp });
  }

  return server(event, context);
};