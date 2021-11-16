import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Games Free</title>
        <meta name="description" content="Aqui você encontrará informações sobre jogos gratuitos!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <h1 className={styles.title}>Games Free</h1>
      </main>

    </div>
  )
}

export default Home
