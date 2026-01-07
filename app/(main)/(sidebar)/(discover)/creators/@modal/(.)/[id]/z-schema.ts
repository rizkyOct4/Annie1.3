import { z } from "zod";
import { ForbiddenRegex } from "@/_util/Regex";

// * ZOD OBJECT
export const zEmailFormSchema = z.object({
  subject: z
    .string()
    .max(30, "Max 30 characters")
    .refine((val) => !val.match(ForbiddenRegex()), {
      message: `* Invalide character`,
    }),
  body: z
    .string()
    .max(80, "Max 80 characters")
    .refine((val) => !val.match(ForbiddenRegex()), {
      message: `* Invalide character`,
    }),
});

export const zCommentFormSchema = z.object({
  body: z.string().max(80, "Max 80 characters"),
  bodyReply: z.string().max(80, "Max 80 characters"),
  idComment: z.number().optional(),
});
