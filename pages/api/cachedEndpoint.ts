// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const cacheTime = 300;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (!process.env.ENDPOINT) return res.status(500).end();

  const result = await (await fetch(process.env.ENDPOINT as unknown as URL))

  const json = await result.json() as unknown;
  res.setHeader('Cache-Control', `max-age=0, s-maxage=${cacheTime}`);
  return res.status(200).json({ json })
}
