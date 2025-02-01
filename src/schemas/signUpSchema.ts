import {z} from "zod"


export const UsernameValidation  = z
.string()
.min(2,"Username must be atleast two characters")
.max(20,"Username must be no more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not content special character")


export const SignUpSchema = z.object({
  username:UsernameValidation,
  email:z.string().email({message:"Invalid email address"}),
  password:z.string().min(6,{message:"password must be at least 6 characters"})
  
})