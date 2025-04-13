import { z } from 'zod'

// Define the login schema
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email cannot be empty')
    .email('Invalid email format')
    .trim()
    .toLowerCase()
    .max(255, 'Email must not exceed 255 characters'),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must not exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),

  rememberMe: z.boolean().default(false),
})

export type Login = z.infer<typeof LoginSchema>

// Define the password reset schema
export const ForgetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type ForgetPassword = z.infer<typeof ForgetPasswordSchema>

// Define the registration schema
export const RegisterSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email cannot be empty')
    .email('Invalid email format')
    .trim()
    .toLowerCase()
    .max(255, 'Email must not exceed 255 characters')
    .refine(val => !val.includes(' '), 'Email cannot contain spaces'),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
  // .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format'),

  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .trim()
    .regex(
      /^[a-zA-Z\s-]+$/,
      'First name can only contain letters, spaces, and hyphens',
    ),

  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .trim()
    .regex(
      /^[a-zA-Z\s-]+$/,
      'Last name can only contain letters, spaces, and hyphens',
    ),

  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    )
    .refine(val => !val.includes(' '), 'Password cannot contain spaces'),

  repeatPassword: z.string({
    required_error: 'Password confirmation is required',
  }),

  dateOfBirth: z
    .date()
    .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01')
    .max(new Date('2015-01-01'), 'You must be at least 10 years old'),
})

export type Register = z.infer<typeof RegisterSchema>
