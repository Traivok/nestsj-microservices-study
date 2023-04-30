import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory }            from "@nestjs/core";

import { AppModule }                      from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter }            from "./app/filters/all-exceptions.filter";
import { TimeoutInterceptor }             from "./app/interceptors/timeout.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;

  const swaggerConf = new DocumentBuilder()
    .setTitle("Api Gateway")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, swaggerConf));

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${ port }/${ globalPrefix }`
  );

}

bootstrap();
