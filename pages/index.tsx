import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useFlags } from 'flagsmith/react';

const Home: NextPage = () => {
  const flags = useFlags(['abc'])

  return (
    <>
      <Head>
        <title>Test flagsmith with Next.js</title>
        <meta name="description" content="Test flagsmith with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Test flagsmith with Next.js
        </h1>
        <ol>
          <li>Go to <Link href="/ssr/1">Test SSR</Link></li>
          <li>Go to <Link href="/isr/1">Test ISR</Link></li>
        </ol>
        <h2>Initial flags</h2>
        <p>{JSON.stringify(flags.foo)}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

export default Home
