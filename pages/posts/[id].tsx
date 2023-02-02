import delay from '../../utils/promiseTimeout';

import type { GetStaticProps, GetStaticPropsContext } from 'next'

type PostProps = {
  post: {
    title: string,
    params: GetStaticPropsContext['params']
  }
}

export default function Page({ post }: PostProps) {
  if (!post) return <div>Loading...</div>

  return JSON.stringify(post);
}

export const getStaticProps: GetStaticProps = async ({params}: GetStaticPropsContext) => {

  if (params?.id === '3') {
    throw new Error(`Error happened for id: ${params.id}`)
  }

  await delay(Math.random() * 10000);

  return {
    props: {
      post: {
        title: 'Hello World!',
        time: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(new Date()),
        params
      },
    },
    revalidate: 10, // ISR. Revalidation time in seconds
  };
}

export const getStaticPaths = async () => {
  return  {
    paths: [
      {
        params: { id: '1' },
      },      {
        params: { id: '2' },
      },
    ],
    // fallback: false
    // fallback: 'blocking', // Static generation but falls back to SSR
    fallback: true, // Static generation but CSR
  };
}
