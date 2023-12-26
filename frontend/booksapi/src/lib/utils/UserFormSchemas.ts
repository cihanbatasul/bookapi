import {z} from 'zod'

export const SignInSchema = z.object({
    userEmail: z.string().email(),
    userPassword: z.string().min(5, {message: "Password must be at least 5 characters and at most 20 characters long"}).max(20)
})

export const SignUpSchema = z.object({
    email: z.string().email(),
    userName: z.string().min(3).max(55),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100)
})

export type SignInSchemaType = z.infer<typeof SignInSchema>
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
