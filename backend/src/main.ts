import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PREFIX } from './constants/prefix.constant';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableShutdownHooks();

  app.setGlobalPrefix(PREFIX.getGlobal());

  const config = new DocumentBuilder()
    .setTitle('SMM-planner')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(PREFIX.SWAGGER, app, document);

  const port = process.env.PORT ?? 5001;
  await app.listen(port);

  logger.log(`Server is running on port: ${port}`);
}

bootstrap();
