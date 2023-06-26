import HeaderNav from "@/components/header"
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import styles from "../../styles/Recompensas.module.css"

const index = () => {
    const {user} = useContext(UserContext)
  return (
    <>
        <HeaderNav user={user}/>
        <h1>Recompensas</h1>
    </>
  )
}

export default index