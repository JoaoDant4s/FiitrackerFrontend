import styles from "../../styles/Home.module.css"
import HeaderNav from "@/components/header"
import { UserContext } from "@/context/UserContext"
import { getDay } from "@/helpers/dayTime"
import { obterUltimosCincoDiasUteis } from "@/helpers/weekDays"
import { getSession, signOut, useSession } from "next-auth/react"
import { useContext, useEffect, useState } from 'react'

export const Home = ({authUser}) => {
    const { user, setUser } = useContext(UserContext)
    const [ ultimosCincoDiasUteis ] = useState(obterUltimosCincoDiasUteis().reverse())

    useEffect(() => {
      console.log(authUser)
      setUser(authUser)
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
                  user?.checkins.slice(-5).some((checkin) => {
                    return checkin.data === dia
                  }) ? (
                    <p
                      className={styles.circlesgreen}
                      key={dia}
                    >
                      {getDay(dia)}
                    </p>
                  ) : (
                    <p
                      className={styles.circlesred}
                      key={dia}
                    >
                      {getDay(dia)}
                    </p>
                  )
                )
              })}
            </div>
            <div>
              <h1>{user?.multiplicador && `${user.multiplicador}x`}</h1>
            </div>
          </div>
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
    let user
    await fetch(`http://localhost:8080/user/username?username=${session.user.name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(async (res) => {
      return await res.json()
    }).then((json) => {
      user = json
    })

    if(user) {
      await fetch(`http://localhost:8080/checkin/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        return res.json()
      }).then(json => {
        user.checkins = json.map((checkin) => {
          return {
            id: checkin.id,
            data: checkin.data,
            hora: checkin.hora
          }
        })
      })
    }

    return {
      props: {
        authUser: JSON.parse(JSON.stringify(user))
      }
    }
  }
export default Home