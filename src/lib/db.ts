import { neon } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';
import { Config } from 'sst/node/config';
import { z } from 'zod';

const prisma = new PrismaClient();

export const dbClient = async () => neon(Config.DATABASE_URL);

export const dbNow = async () => {
	const sql = await dbClient();
	return sql`SELECT NOW()`;
};

// Define the regular expression for first name and last name validation
const nameRegex = /^[a-zA-Z-' _0-9]+$/;

export const userSchema = z.object({
	email: z.string().email({ message: 'Invalid email format' }),
	firstName: z
		.string()
		.min(1, { message: 'First Name is required' })
		.max(150, { message: 'First Name must not exceed 150 characters' })
		.regex(nameRegex, { message: 'First Name contains invalid characters' }),
	lastName: z
		.string()
		.min(1, { message: 'Last Name is required' })
		.max(150, { message: 'Last Name must not exceed 150 characters' })
		.regex(nameRegex, { message: 'Last Name contains invalid characters' })
});

export const createUser = async (email: string, firstName: string, lastName: string) => {
	try {
		const validatedData = userSchema.parse({ email, firstName, lastName });
		const newUser = await prisma.user.create({
			data: validatedData
		});

		console.log('Created new user:', newUser);
		return newUser;
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('Validation error creating user:', error.flatten());
			throw new Error(`Validation failed: ${error.message}`);
		}

		console.error('Error creating user:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
