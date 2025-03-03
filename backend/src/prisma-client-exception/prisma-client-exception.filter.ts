import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import {
  PRISMA_ERROR_CODE_RECORD_NOT_FOUND,
  PRISMA_ERROR_CODE_UNIQUE,
  PRISMA_ERROR_CODE_UUID,
} from 'src/constants/error-code.constant'
import * as Sentry from '@sentry/nestjs'
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    Sentry.captureException(exception)
    console.error(exception.message)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case PRISMA_ERROR_CODE_UNIQUE:
      case PRISMA_ERROR_CODE_UUID:
        const statusConflict = HttpStatus.CONFLICT
        response.status(statusConflict).json({
          statusCode: statusConflict,
          message,
        })
        break
      case PRISMA_ERROR_CODE_RECORD_NOT_FOUND:
        const statusNotFound = HttpStatus.NOT_FOUND
        response.status(statusNotFound).json({
          statusCode: statusNotFound,
          message,
        })
        break
      default:
        super.catch(exception, host)
        break
    }
  }
}
