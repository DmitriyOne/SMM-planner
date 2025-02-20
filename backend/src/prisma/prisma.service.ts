import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

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
