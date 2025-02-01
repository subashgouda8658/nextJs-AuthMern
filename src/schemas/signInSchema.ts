import { z } from "zod"


export const SigInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
})