// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// const { curly } = require('node-libcurl');
import fetch from 'isomorphic-fetch';

const handler = async (request: NextApiRequest, response: NextApiResponse<unknown>) => {
  const {
    query,
    headers,
  } = request;

  const redirect = query?.redirect;
  const cacheTime = query?.cacheTime || 30;

  if (!redirect) return response.status(500).end();

  const httpHeader = Object.entries(headers).map(([key, value]) => `${key}: ${value}`);

  // const { data } = await curly.get(decodeURIComponent(redirect as string), {httpHeader});
  
  const data = await (await fetch(decodeURIComponent(redirect as string), {headers: headers as HeadersInit})).json();

  // Set the Vercel shared cache time
  // response.setHeader('Cache-Control', `max-age=0, s-maxage=${cacheTime}`)

  // Return the original response
  return response.status(200).json(data);
}
  
export default handler;