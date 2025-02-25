import { VALIDATE_ENV_ERROR_MSG } from 'src/constants/validate.constant'
import { EnvConfig, envSchema } from './env-schema.config'

export const validateConfig = (config: Record<string, unknown>): EnvConfig => {
  const parsed = envSchema.safeParse(config)
  if (!parsed.success) {
    console.error(VALIDATE_ENV_ERROR_MSG, parsed.error.format())
    process.exit(1)
  }
  return parsed.data
}
