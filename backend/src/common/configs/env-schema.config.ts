import { z } from 'zod'
import { ENodeEnv } from '../enums/node-env.enum'
import {
  NODE_ENV_DEFAULT_PORT,
  NODE_ENV_DEFAULT_SALT_ROUNDS,
  NODE_ENV_JWT_SECRET_MAX_LENGTH_ERROR_MSG,
  NODE_ENV_JWT_SECRET_MIN_LENGTH,
  NODE_ENV_ONLY_DIGITS_REGEX,
} from 'src/constants/node-env.constant'

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(ENodeEnv).default(ENodeEnv.development),
  PORT: z.string().regex(NODE_ENV_ONLY_DIGITS_REGEX).default(NODE_ENV_DEFAULT_PORT).transform(Number),
  JWT_SECRET: z.string().min(NODE_ENV_JWT_SECRET_MIN_LENGTH, NODE_ENV_JWT_SECRET_MAX_LENGTH_ERROR_MSG),
  SALT_ROUNDS: z.string().regex(NODE_ENV_ONLY_DIGITS_REGEX).default(NODE_ENV_DEFAULT_SALT_ROUNDS).transform(Number),
  THROTTLE_TTL: z.string().regex(NODE_ENV_ONLY_DIGITS_REGEX).default('60000').transform(Number),
  THROTTLE_LIMIT: z.string().regex(NODE_ENV_ONLY_DIGITS_REGEX).default('20').transform(Number),
})

export type EnvConfig = z.infer<typeof envSchema>
