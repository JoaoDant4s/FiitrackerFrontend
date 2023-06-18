import HeaderNav from "@/components/header"
import { UserContext } from "@/context/UserContext"
import { getSession } from "next-auth/react"
import { useContext, useEffect } from 'react'

export const Home = ({authUser}) => {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
      setUser(authUser)
    }, [])
    return (
        <>
            <HeaderNav user={user}/>
            <div className="container_page_with_header">
                <h1>Home page</h1>
                <h1>{user?.aluno?.nomeCompleto}</h1>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if(!session){
      return{
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    let user = await fetch(`http://localhost:3000/api/usuario/${session.user.email}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })

    user = await user.json()
    console.log("resposta do fetch do user")
    console.log(user)
    if(!user){
      let responseAluno = await fetch("http://localhost:3000/api/aluno", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeCompleto: session.user.name,
          dataNascimento: "",
          cpf: "",
          telefone: "",
        })
      })
      responseAluno = await responseAluno.json()
      console.log("aluno criado?")
      let responseUser = await fetch(`http://localhost:3000/api/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          senha: "",
          aluno: responseAluno.aluno,
          role: 'user',
          pontos: 0,
          multiplicador: 1.0,
          image: session.user.image,
          historicoRecompensas: []
        })
      })
      responseUser = await responseUser.json()
      user = responseUser.usuario
      user.aluno = responseAluno.aluno
    }
    return {
      props: {
        authUser: JSON.parse(JSON.stringify(user))
      }
    }
  }
export default Home