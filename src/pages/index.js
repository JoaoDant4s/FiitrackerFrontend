import Head from 'next/head'
import styles from '../styles/Login.module.css'
import { getSession, signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/schema/loginSchema'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (async (data) => {
    console.log(data)
    const res = await signIn('credentials', {
      username: data.username,
      senha: data.senha,
      redirect: false
    })

    if(res.status === 200){
      router.push("/home")
    } else {
      toast.error(res.error)
    }
  })
  return (
    <>
      <Head>
        <title>Fittracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
      />
      <main className={styles.container_page}>
        <div className={styles.card}>
          <div className={styles.image}></div>
          <div className={styles.input_container}>
            <h1 className={styles.title_logo}>FitTracker</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.input_block}>
                <label htmlFor="email">Usuário:</label>
                <input 
                  type="text" 
                  placeholder=" Digite seu nome de usuário" 
                  {...register("username")}
                  autoComplete='off'
                  spellCheck="false"
                  className={styles.input}
                />
                {errors.username && <span className={styles.errors}>{errors.username.message}</span>}
              </div>
              <div className={styles.input_block}>
                <input 
                  type="password" 
                  placeholder="Senha"
                  {...register("senha")}
                  autoComplete='off'
                  className={styles.input} 
                />
                {errors.senha && <span className={styles.errors}>{errors.senha.message}</span>}
              </div>
              <button type="submit" className={styles.button_submit}>Entrar</button>
              {/* <div className={styles.social_container}> 
                <p>Ou</p>
                <button onClick={() => signIn('github')}>Github</button>
              </div> */}
            </form>
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
