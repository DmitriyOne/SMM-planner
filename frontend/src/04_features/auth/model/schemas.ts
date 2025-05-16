import { z } from "zod"

import { AUTH_REGEX, AUTH_VALIDATE_MSG } from "@/06_shared/config"

export const loginSchema = z.object({
  email: z.string().email(AUTH_VALIDATE_MSG.email.invalid),
  password: z
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

export const registerSchema = z
  .object({
    name: z.string().min(3, AUTH_VALIDATE_MSG.name.min),
    email: z.string().email(AUTH_VALIDATE_MSG.email.invalid),
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_VALIDATE_MSG.password.notMatch,
    path: ["confirmPassword"],
  })
