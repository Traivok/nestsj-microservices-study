import { Logger }      from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule }             from "./app/app.module";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { ConfigService }         from "@nestjs/config";

async function bootstrap() {
  const appContext    = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options:   {
      urls:         [ configService.getOrThrow<string>("RMQ_URL") ],
      queue:        "admin-backend",
      queueOptions: {
        durable: false
      }
    }
  });

  await app.listen();

  Logger.log(`🚀 Microservice is listening`);
}

bootstrap();
