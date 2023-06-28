import CelulaProduto from "@/components/celulaProduto";
import HeaderNav from "@/components/header";
import { UserContext } from "@/context/UserContext";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/CadastrarProduto.module.css';

export const Recompensas = ({authUser}) => {
    const { user, setUser } = useContext(UserContext)
    const [listaFiltrada, setListaFiltrada] = useState([])
    const [search, setSearch] = useState("")
    const [produtos, setProdutos] = useState([])
    useEffect(() => {
      setUser(authUser)
        const fetchData = async () => {
            let response = await fetch("http://localhost:8080/recompensa", {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            if(response){
                response = await response.json()
            }
            setProdutos(response.reverse())
        }
        fetchData()
        // setProdutos(response)
    }, [])

    const filtrarProdutos = (string) => {
      console.log(string)
      setSearch(string)
        const filteredList = produtos.filter((recompensa) => {
            return recompensa.nome.toLowerCase().includes(search.toLowerCase())
        })
        setListaFiltrada(filteredList)
    }

    return (
        <>
            <Head>
                <title>Recompensas</title>
            </Head>
            <HeaderNav user={user}/>
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
            <div className="container_page_with_header_no_centered">
                <div className={styles.search_product_container}>
                    <div>
                        <input
                            type="text"
                            className={styles.search_box}
                            value={search}
                            onChange={(e) => filtrarProdutos(e.target.value)}
                            placeholder="Buscar produto"
                        />
                        <AiOutlineSearch className={styles.search_icon} />
                    </div>
                </div>
                <div className={styles.products_container}>
                    {produtos && search ? listaFiltrada?.map((produto) => (
                        <CelulaProduto produto={produto} key={produto.id} user={user}/>
                    )) : produtos?.map((produto) => (
                      <CelulaProduto produto={produto} key={produto.id} user={user}/>
                  ))}
                </div>
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
  console.log("Usuario recebido:")
  console.log(user)

  return {
    props: {
      authUser: JSON.parse(JSON.stringify(user))
    }
  }
}

export default Recompensas;