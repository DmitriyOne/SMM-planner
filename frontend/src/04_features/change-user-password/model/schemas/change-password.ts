import { AUTH_REGEX, AUTH_VALIDATE_MSG } from "@/06_shared/config"
import { z } from "zod"

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, AUTH_VALIDATE_MSG.password.min),
    newPassword: z
      .string()
      .min(6, AUTH_VALIDATE_MSG.password.min)
      .refine((val) => AUTH_REGEX.PASSWORD_LATIN_ALPHABET_REGEX.test(val), {
        message: AUTH_VALIDATE_MSG.password.latin,
      })
      .refine(
        (val) => AUTH_REGEX.PASSWORD_TWO_UPPERCASE_LETTERS_REGEX.test(val),
        {
          message: AUTH_VALIDATE_MSG.password.uppercase,
        },
      )
      .refine((val) => AUTH_REGEX.PASSWORD_TWO_DIGITS_REGEX.test(val), {
        message: AUTH_VALIDATE_MSG.password.digits,
      }),
    confirmPassword: z
      .string()
      .min(6, AUTH_VALIDATE_MSG.password.min)
      .refine((val) => AUTH_REGEX.PASSWORD_LATIN_ALPHABET_REGEX.test(val), {
        message: AUTH_VALIDATE_MSG.password.latin,
      })
      .refine(
        (val) => AUTH_REGEX.PASSWORD_TWO_UPPERCASE_LETTERS_REGEX.test(val),
        {
          message: AUTH_VALIDATE_MSG.password.uppercase,
        },
      )
      .refine((val) => AUTH_REGEX.PASSWORD_TWO_DIGITS_REGEX.test(val), {
        message: AUTH_VALIDATE_MSG.password.digits,
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: AUTH_VALIDATE_MSG.password.notMatch,
    path: ["confirmPassword"],
  })
