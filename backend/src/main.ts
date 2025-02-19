import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PREFIX } from './constants/prefix.constant';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableShutdownHooks();

  app.setGlobalPrefix(PREFIX.getGlobal());

  const port = process.env.PORT ?? 5001;
  await app.listen(port);

  logger.log(`Server is running on port: ${port}`);
}

bootstrap();
