export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import type { NextApiRequest, NextApiResponse } from 'next';
import { Config } from 'sst/node/config';
import { dbNow } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const secretVal = Config.SECRET_VAL;
	const dbUrl = Config.DATABASE_URL;

	const dbResult = await dbNow();
	const now = dbResult[0].now ?? null;
	res.status(200).json({ dbUrl, secretVal, now });
}
