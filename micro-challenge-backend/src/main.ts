/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule }             from './app/app.module';
import { ConfigService }         from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const appContext    = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options:   {
      urls:         [ configService.getOrThrow<string>("RMQ_URL") ],
      queue:        "challenge-backend",
      queueOptions: {
        durable: false
      }
    }
  });

  await app.listen();
}

bootstrap();
