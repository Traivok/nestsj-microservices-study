import { Logger }      from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule }             from "./app/app.module";
import { RmqOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls:         [ "amqp://user:password@localhost:5673/smartranking" ],
      queue:        "admin-backend",
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
  Logger.log(
    `🚀 Microservice is listening`
  );
}

bootstrap();
