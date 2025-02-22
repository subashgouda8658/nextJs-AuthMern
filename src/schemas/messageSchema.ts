import {z} from "zod"

export const MessageSchema = z.object({
  content:z
  .string()
  .min(10,{message:"content must be at least of 10 characters"})
  .max(300,{message:"content must be no loger than  300 characters"} )
})

