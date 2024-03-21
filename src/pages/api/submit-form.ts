import { z } from 'zod';

import { createUser, userSchema } from '@/lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	const contentType = req.headers['content-type'];
	if (!contentType || contentType !== 'application/json') {
		res.status(415).json({ error: 'Invalid content type' });
		return;
	}

	try {
		const validatedData = userSchema.parse(req.body);

		const newUser = await createUser(
			validatedData.email,
			validatedData.firstName,
			validatedData.lastName
		);
		res.status(201).json(newUser);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ error: 'Validation failed', details: error.errors });
		} else {
			console.error('Failed to create user:', error);
			res.status(500).json({ error: 'Failed to create user' });
		}
	}
}
