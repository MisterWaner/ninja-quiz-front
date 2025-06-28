import { z } from 'zod';

export const registerSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(4, {
                message: 'Ton pseudo doit contenir au moins 4 caractères',
            })
            .max(20, {
                message: 'Ton pseudo ne doit pas dépasser 20 caractères',
            }),

        password: z
            .string()
            .trim()
            .min(8, {
                message: 'Ton mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),

        confirmPassword: z
            .string()
            .trim()
            .min(8, {
                message: 'Ton mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, {
            message: 'Ton pseudo doit contenir au moins 4 caractères',
        })
        .max(20, {
            message: 'Ton pseudo ne doit pas dépasser 20 caractères',
        }),

    password: z
        .string()
        .trim()
        .min(8, {
            message: 'Ton mot de passe doit contenir au moins 8 caractères',
        })
        .max(20, {
            message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
        })
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
            {
                message:
                    'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
            }
        ),
});

export const updatePasswordSchema = z
    .object({
        password: z
            .string()
            .trim()
            .min(8, {
                message: 'Ton mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
        confirmPassword: z
            .string()
            .trim()
            .min(8, {
                message: 'Ton mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });
