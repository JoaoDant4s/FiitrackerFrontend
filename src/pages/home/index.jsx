import styles from "../../styles/Home.module.css"
import HeaderNav from "@/components/header"
import { UserContext } from "@/context/UserContext"
import { obterUltimosCincoDiasUteis } from "@/helpers/weekDays"
import { getSession, signOut } from "next-auth/react"
import { useContext, useEffect, useState } from 'react'

export const Home = ({authUser}) => {
    const { user, setUser } = useContext(UserContext)
    const [ ultimosCincoDiasUteis ] = useState(obterUltimosCincoDiasUteis())
    useEffect(() => {
      setUser(authUser)
      console.log(authUser)
    }, [])
    return (
        <>
            <HeaderNav user={user}/>
            <div className="container_page_with_header">
              <div className={styles.image}></div>
              <div className={styles.bottom_interface}>
                <div className={styles.circles_container}>
                  {ultimosCincoDiasUteis?.map((dia) => {
                    return (
                      <p
                        className={styles.circlesgreen}
                        key={dia}
                      ></p>
                    )
                  })}
                </div>
                <div>
                  <h1>{user?.multiplicador && `${user.multiplicador}x`}</h1>
                </div>
              </div>
                {/* <h1>Home page</h1>
                <h1>{user?.aluno?.username}</h1> */}
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    console.log(session)
    if(!session){
      return{
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    let user = await fetch(`http://localhost:3000/api/usuario/${session.user.name}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })

    // let userAPI = await fetch(`http://localhost:8080/user/username?username=${}`, {
    //   method: 'GET',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },
    // })

    user = await user.json()
    console.log("resposta do fetch do user")
    console.log(user)
    // if(!user){
    //   let responseAluno = await fetch("http://localhost:3000/api/aluno", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       nomeCompleto: session.user.name,
    //       dataNascimento: "",
    //       cpf: "",
    //       telefone: "",
    //     })
    //   })
    //   responseAluno = await responseAluno.json()
    //   console.log("aluno criado?")
    //   let responseUser = await fetch(`http://localhost:3000/api/usuario`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: session.user.username,
    //       senha: "",
    //       aluno: responseAluno.aluno,
    //       role: 'user',
    //       pontos: 0,
    //       multiplicador: 1.0,
    //       image: session.user.image,
    //       historicoRecompensas: []
    //     })
    //   })
    //   responseUser = await responseUser.json()
    //   user = responseUser.usuario
    //   user.aluno = responseAluno.aluno
    // }
    return {
      props: {
        authUser: JSON.parse(JSON.stringify(user))
      }
    }
  }
export default Home