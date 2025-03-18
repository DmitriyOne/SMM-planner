import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { PREFIX } from './constants/prefix.constant'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'
import {
  MAIN_ALLOWED_HEADERS,
  MAIN_APPLICATION_RUNNING_MSG,
  MAIN_DEVELOP_DOMAIN,
  MAIN_LOGGER_NAME,
  MAIN_PROD_DOMAIN,
  MAIN_SERVER_RUNNING_MSG,
  MAIN_SWAGGER_TITLE,
  MAIN_SWAGGER_VERSION,
} from './constants/main.constant'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from './common/configs/env-schema.config'
import helmet from 'helmet'
import { ENodeEnv } from './common/enums/node-env.enum'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger(MAIN_LOGGER_NAME)

  app.enableShutdownHooks()
  app.use(helmet({ hidePoweredBy: true }))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.setGlobalPrefix(PREFIX.getGlobal())

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const config = new DocumentBuilder()
    .setTitle(MAIN_SWAGGER_TITLE)
    .setVersion(MAIN_SWAGGER_VERSION)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(PREFIX.SWAGGER, app, document)

  const configService = app.get(ConfigService<EnvConfig>)

  const location = configService.get('NODE_ENV')
  const allowedOrigins =
    location === ENodeEnv.development ? [MAIN_DEVELOP_DOMAIN] : [MAIN_DEVELOP_DOMAIN, MAIN_PROD_DOMAIN]

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: MAIN_ALLOWED_HEADERS,
  })

  const port = configService.get<number>('PORT')
  await app.listen(port)
  logger.log(MAIN_SERVER_RUNNING_MSG(port))

  const url = await app.getUrl()
  logger.log(MAIN_APPLICATION_RUNNING_MSG(url))
}

bootstrap()
