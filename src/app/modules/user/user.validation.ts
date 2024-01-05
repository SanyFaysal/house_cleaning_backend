
import { z } from 'zod';

const signInZodSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: 'ID is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});


const signupZodSchema = z.object({
    body: z.object({
        fullName: z.string({
            required_error: 'ID is required',
        }),
        email: z.string({
            required_error: 'ID is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});


export const UserValidation = {
    signInZodSchema,
    signupZodSchema
}