import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let app: any;

export const handler = async (event: any, context: any) => {
  if (!app) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    app = await NestFactory.create(AppModule, adapter);
    app.enableCors();
    await app.init();
  }

  // Parse the request
  const { path = '/', httpMethod = 'GET', headers = {}, body } = event;
  
  return new Promise((resolve, reject) => {
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    };

    const req = {
      method: httpMethod,
      url: path,
      headers: headers,
      body: body ? JSON.parse(body) : {},
    };

    const res = {
      statusCode: 200,
      setHeader: (key: string, value: string) => {
        response.headers[key] = value;
      },
      status: (code: number) => {
        response.statusCode = code;
        return res;
      },
      json: (data: any) => {
        response.body = JSON.stringify(data);
        resolve(response);
      },
      send: (data: any) => {
        response.body = typeof data === 'string' ? data : JSON.stringify(data);
        resolve(response);
      },
      end: (data?: any) => {
        if (data) response.body = data;
        resolve(response);
      },
    };

    // Handle the request through NestJS
    try {
      const expressApp = app.getHttpAdapter().getInstance();
      expressApp(req, res);
    } catch (error) {
      reject(error);
    }
  });
};