import { z } from "zod";
import {
  CapitalizeRegex,
  ForbiddenRegex,
  ForbiddenRegexEmail,
  EmailRegex,
} from "@/_util/Regex";

// ! REGEX ini BERURUTAN METHODNYA !!!! PERHATIKAN URUTANNYA !

export const zRegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(0)
    .max(12, "Max 12 Characters")
    .refine((val) => !ForbiddenRegex().test(val), {
      message: `Contains invalid characters`,
    })
    .regex(CapitalizeRegex(), "*Start with a capital letter"),

  lastName: z
    .string()
    .min(0)
    .refine((val) => !ForbiddenRegex().test(val), {
      message: "Last Name contains invalid characters",
    })
    .regex(CapitalizeRegex(), "Last Name must start with a capital letter"),

  email: z
    .string()
    .min(0)
    .refine((val) => !ForbiddenRegexEmail().test(val), {
      message: "Email contains invalid characters",
    }),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const zLoginFormSchema = z.object({
  email: z
    .string()
    .min(0)
    .refine((val) => !ForbiddenRegexEmail().test(val), {
      message: "Contains invalid characters",
    }),
  password: z.string().min(1, "Password must be at least 1 characters"),
});
