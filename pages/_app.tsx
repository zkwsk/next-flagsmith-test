import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'

import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';
import { IState } from 'flagsmith/types';

import { RequestInterceptor } from 'node-request-interceptor'
// import { interceptXMLHttpRequest } from 'node-request-interceptor/lib/interceptors/XMLHttpRequest'

import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default'
import { NextPageContext } from 'next/types';

const intercept = ()=> {
  const interceptor = new RequestInterceptor(withDefaultInterceptors)

  interceptor.use(async (req) => {
    if (['https://edge.api.flagsmith.com/api/v1/'].includes(req.url.origin)) {

      // We don't want to cache POST requests.
      if (req.method === 'post') return req;

      const headers = req.headers as HeadersInit | undefined;

      const result = await (await fetch(`/api/cached?redirect=${encodeURIComponent(req.url.href)}`, { method: 'get', headers })).json()

      console.log("INTERCEPTED");

      return result;
    }
  })
}



function MyApp({ Component, pageProps, flagsmithState }: { flagsmithState: IState} & AppProps) {
  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      <div className={styles.container}>    
        <Component {...pageProps} />
      </div>
    </FlagsmithProvider>
  )
}

// MyApp.getStaticProps = async () => {
MyApp.getInitialProps = async (context: NextPageContext) => {
  const { req } = context;
  const isServer = !!req;

  // if (isServer) intercept();
  intercept();

  if (!process.env.FLAGSMITH_SERVER_KEY) {
    throw new Error('Missing Flagsmith server key');
  }

  

  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_SERVER_KEY,
    // stores flags in localStorage cache
    cacheFlags: false,
    // See https://docs.flagsmith.com/flag-analytics/ for more info
    enableAnalytics: true,
    // optionaly specify the identity of the user to get their specific flags
    //identity: 'my_user_id',
  });

  const flagsmithState = flagsmith.getState()

  // console.log({flagsmithState})  

  return { flagsmithState };
}


export default MyApp
