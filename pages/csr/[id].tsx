import { useRouter } from 'next/router'
import delay from '../../utils/promiseTimeout';
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import JsonFormatter from 'react-json-formatter'
import { useFlags } from 'flagsmith/react';
import React, { useEffect, useState } from 'react';

type PostProps = {
  post: {
    title: string,
    params?: GetStaticPropsContext['params'],
    time?: string
  }
}

const useFakeFetch = (url: string) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await delay(Math.random() * 3000);

      setData("Hello World!");

      // setData({
      //   props: {
      //     post: {
      //       title: 'Hello World!',
      //       time: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Copenhagen' }).format(new Date()),
      //     },
      //   },
      // });
      setLoading(false);
    })()
  }, [url])

  return { data, error, loading }
}


export default function Page({ post }: PostProps) {
  const router = useRouter();
  const flags = useFlags(['abc']);

  const { pathname, query } = router;

  console.log({pathname, query})

  const { data, error, loading } = useFakeFetch('http://abc.com');

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' },
  }
  

  const Template = ({children}: React.PropsWithChildren) => (
    <div>
      <h1>CSR Page</h1>
      {children}
    </div>
  )

  if (loading === true || !data ) return <Template><p>Loading...</p></Template>

  if (!data) return <Template><p>No data</p></Template>

  return <Template><JsonFormatter json={JSON.stringify({flags})} jsonStyle={jsonStyle} /></Template>;
}
