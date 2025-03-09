import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { EnvConfig } from '../common/configs/env-schema.config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor(private readonly configService: ConfigService<EnvConfig>) {
    super({ datasources: { db: { url: configService.get<string>('DATABASE_URL') } } })
  }

  async onModuleInit() {
    this.logger.log('Successfully connected to the database')
    try {
      await this.$connect()
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error("Couldn't connect to the database" + error.message)
      } else {
        console.log("Couldn't connect to the database")
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('The application is shutting down!')
    await this.$disconnect()
  }
}
