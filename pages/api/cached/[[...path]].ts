// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const { curly } = require('node-libcurl');
const { Curl } = require('node-libcurl');

// const cacheTime = 300;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<unknown>
// ) {
//   if (!process.env.ENDPOINT) return res.status(500).end();

//   const result = await (await fetch(process.env.ENDPOINT as unknown as URL))

//   const json = await result.json() as unknown;
//   res.setHeader('Cache-Control', `max-age=0, s-maxage=${cacheTime}`);
//   return res.status(200).json({ json })
// }

const cacheTime = 300;

const handler = async (request: NextApiRequest, response: NextApiResponse<unknown>) => {
  const {
    method,
    query,
    cookies,
    body,
    env,
    preview,
    previewData,
    aborted,
    httpVersion,
    httpVersionMajor,
    httpVersionMinor,
    complete,
    headers,
    rawHeaders,
    trailers,
    rawTrailers,
    url,
    statusCode,
    statusMessage,
  } = request;

  const redirect = query?.redirect;
  const cacheTime = query?.cacheTime || 30;

  if (!redirect) return response.status(500).end();

  // const redirect = "https%3A%2F%2Fedge.api.flagsmith.com%2Fapi%2Fv1%2Fflags%2F"

  const curl = new Curl();

  // curl.setOpt(Curl.option.HTTPHEADER, ['x-environment-key: ser.Lxms2Qo3pNbtytAFVp6o6B']);

  //const { data } = await curly.get(decodeURIComponent(redirect as string));

  const curlyOptions = {
    'httpHeader': ['x-environment-key: ser.Lxms2Qo3pNbtytAFVp6o6B']
  }

  const { data } = await curly.get(decodeURIComponent(redirect as string), curlyOptions);
  
  // Set the Vercel shared cache time
  response.setHeader('Cache-Control', `max-age=0, s-maxage=${cacheTime}`)

  // Return the original response
  return response.status(200).json(data);
}
  
export default handler;