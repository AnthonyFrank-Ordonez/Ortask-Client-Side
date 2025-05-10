import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email('Must be valid email'),
		username: z.string().min(8, 'Username must be atleast 8 or more'),
		password: z
			.string()
			.min(8, 'Pasword length must be 8 or more')
			.regex(
				/^(?=.*?[A-Z]).+$/,
				'Password must have alteast one capital letter'
			)
			.regex(/^(?=.*?[0-9]).+$/, 'Password nust have atleast 1 digit'),
		confirmPassword: z.string(),
		role: z.enum(['Employee', 'Lead', 'Manager']),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password is not match',
				path: ['confirmPassword'],
			});
		}
	});

export const profileSchema = z.object({
	username: z.string().min(8, 'Username must be 8 or more'),
	profilePicture: z.string(),
});
