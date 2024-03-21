import { neon } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';
import { Config } from 'sst/node/config';

const prisma = new PrismaClient();

export const dbClient = async () => neon(Config.DATABASE_URL);

export const dbNow = async () => {
	const sql = await dbClient();
	return sql`SELECT NOW()`;
};

export const createUser = async (email: string, firstName: string, lastName: string) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				firstName,
				lastName
			}
		});

		console.log('Created new user:', newUser);
	} catch (error) {
		console.error('Error creating user:', error);
	} finally {
		await prisma.$disconnect();
	}
};
