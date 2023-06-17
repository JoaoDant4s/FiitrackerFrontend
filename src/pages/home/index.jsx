import HeaderNav from "@/components/header"
import { getSession, useSession } from "next-auth/react"

export const Home = () => {
    const { data: session } = useSession()
    return (
        <>
            <HeaderNav isAdmin={false} session={session}/>
            <div className="container_page_with_header">
                <h1>Home page</h1>
                <h1>{session?.user?.name}</h1>
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
    return {
      props: {
        session
      }
    }
  }
export default Home