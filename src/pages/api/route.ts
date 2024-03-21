export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { createUser } from '@/lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	const { email, firstName, lastName } = req.body;

	if (!email || !firstName || !lastName) {
		res.status(400).json({ error: 'Missing required user information' });
		return;
	}

	try {
		const newUser = await createUser(email, firstName, lastName);
		res.status(201).json(newUser);
	} catch (error) {
		console.error('Failed to create user:', error);
		res.status(500).json({ error: 'Failed to create user' });
	}
}
