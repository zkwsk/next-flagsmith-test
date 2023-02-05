import delay from '../../utils/promiseTimeout';
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import JsonFormatter from 'react-json-formatter'
import { useFlags } from 'flagsmith/react';


type PostProps = {
  post: {
    title: string,
    params: GetStaticPropsContext['params']
  }
}


export default function Page({ post }: PostProps) {
  const flags = useFlags(['abc']);

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' },
  }
  

  const Template = ({children}: React.PropsWithChildren) => (
    <div>
      <h1>SSR Page</h1>
      {children}
    </div>
  )

  if (!post) return <Template><p>Loading...</p></Template>

  return <Template><JsonFormatter json={JSON.stringify({...post, flags})} jsonStyle={jsonStyle} /></Template>;
}

export const getServerSideProps: GetStaticProps = async ({params}: GetStaticPropsContext) => {

  if (params?.id === '3') {
    throw new Error(`Error happened for id: ${params.id}`)
  }

  await delay(Math.random() * 3000);

  return {
    props: {
      post: {
        title: 'Hello World!',
        time: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Copenhagen' }).format(new Date()),
        params
      },
    },
  };
}
