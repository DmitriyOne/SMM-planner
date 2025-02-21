import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { PRISMA_ERROR_CODE_UNIQUE, PRISMA_ERROR_CODE_UUID } from 'src/constants/error-code.constant'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case PRISMA_ERROR_CODE_UNIQUE:
        const statusUnique = HttpStatus.CONFLICT
        response.status(statusUnique).json({
          statusCode: statusUnique,
          message,
        })
        break
      case PRISMA_ERROR_CODE_UUID:
        const statusUuid = HttpStatus.CONFLICT
        response.status(statusUuid).json({
          statusCode: statusUuid,
          message,
        })
      default:
        super.catch(exception, host)
        break
    }
  }
}
