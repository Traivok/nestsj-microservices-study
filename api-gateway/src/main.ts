import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector }                             from "@nestjs/core";

import { AppModule }                      from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TimeoutInterceptor }             from "./app/interceptors/timeout.interceptor";
import { RpcExceptionsInterceptor } from "./app/interceptors/rpc-exceptions.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalInterceptors(new TimeoutInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector),
      {
        excludeExtraneousValues: this,
        excludePrefixes: ['_'],
      }),
    new RpcExceptionsInterceptor()
    );

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new RpcFilter());

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
