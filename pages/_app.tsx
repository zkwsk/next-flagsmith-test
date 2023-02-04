import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'

import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';
import { IState } from 'flagsmith/types';


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
MyApp.getInitialProps = async () => {
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

 console.log({flagsmithState})

 return { flagsmithState };
}


export default MyApp
