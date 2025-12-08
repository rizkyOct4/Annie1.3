import { z } from "zod";
import { ForbiddenRegex, InvalidCharRegexEmail } from "@/_util/Regex";

export const zRegisterFormSchema = z.object({
  firstName: z
    .string()
    .max(20, "Max 20 character")
    .refine((val) => !val.match(ForbiddenRegex()), {
      message: `Invalide character`,
    }),

  lastName: z
    .string()
    .max(20, "Max 20 character")
    .refine((val) => !val.match(ForbiddenRegex()), {
      message: `Invalide character`,
    }),
  email: z
    .string()
    .max(30, "Max 30 character")
    .refine((val) => !val.match(InvalidCharRegexEmail()), {
      message: `Invalide character`,
    }),
  password: z
    .string()
    .max(20, "Max 20 character")
    .refine((val) => !val.match(ForbiddenRegex())),
  role: z.string(),
});

export const zLoginFormSchema = z.object({
  email: z
    .string()
    .max(30, "Max 30 characters")
    .refine((val) => !val.match(InvalidCharRegexEmail()), {
      message: `Invalide character`,
    }),
  password: z
    .string()
    .max(12, "Max 12 characters")
    .refine((val) => !val.match(ForbiddenRegex()), {
      message: `invalid character`,
    }),
});
