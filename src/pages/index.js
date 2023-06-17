import Head from 'next/head'
import styles from '../styles/Login.module.css'
import { getSession, signIn } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fittracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container_page}>
        <div className={styles.card}>
          <div className={styles.image}></div>
          <div className={styles.input_container}>
            <h1 className={styles.title_logo}>FitTracker</h1>
            <div className={styles.input_block}>
              <label htmlFor="email">Email:</label>
              <input type="email" placeholder=" Digite seu email" className={styles.input}/>
            </div>
            <div className={styles.input_block}>
              <label htmlFor="senha">Senha:</label>
              <input type="password" placeholder=" Digite sua senha" className={styles.input} />
            </div>
            <div>
              <p>Ou</p>
              <button onClick={() => signIn('github')}>Github</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  console.log(session)

  if(session){
    return{
      redirect: {
        destination: '/home'
      }
    }
  }
  return {
    props: {
      session
    }
  }
}
