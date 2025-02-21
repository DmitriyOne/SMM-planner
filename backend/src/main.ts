import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { PREFIX } from './constants/prefix.constant'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')

  app.enableShutdownHooks()

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.setGlobalPrefix(PREFIX.getGlobal())

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const config = new DocumentBuilder().setTitle('SMM-planner').setVersion('1.0').build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(PREFIX.SWAGGER, app, document)

  const port = process.env.PORT ?? 5001
  await app.listen(port)

  logger.log(`Server is running on port: ${port}`)
}

bootstrap()
