export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
import { Config } from 'sst/node/config';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const secretVal = Config.SECRET_VAL;
	const dbUrl = Config.DATABASE_URL;
	res.status(200).json({ dbUrl, secretVal });
}
