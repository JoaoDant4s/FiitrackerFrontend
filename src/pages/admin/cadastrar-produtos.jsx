import HeaderNav from "@/components/header"
import Head from "next/head";
import { useState } from "react";
import styles from '../../styles/CadastrarProduto.module.css'
import { AiOutlineSearch } from "react-icons/ai"
import CelulaProduto from "@/components/celulaProduto";

export const CadastrarProdutos = ({produtos}) => {
    const [listaProdutos, setListaProdutos] = useState([])
    const [search, setSearch] = useState("")

    const filtrarProdutos = (string) => {
        setSearch(string)
        const listaFiltrada = listaProdutos.filter((recompensa) => {
            return recompensa.nome.includes(search)
        })
        setListaProdutos(listaFiltrada)
    }

    return (
        <>
            <Head>
                <title>Cadastrar Produtos</title>
            </Head>
            <HeaderNav isAdmin={true}/>
            <div className="container_page_with_header_no_centered">
                <div className={styles.search_product_container}>
                    <div>
                        <input
                            type="search"
                            className={styles.search_box}
                            value={search}
                            onChange={(e) => filtrarProdutos(e.target.value)}
                            placeholder="Buscar produto"
                        />
                        <AiOutlineSearch className={styles.search_icon} />
                    </div>
                    <button className={styles.button_new_product}>Novo produto</button>
                </div>
                <div className={styles.products_container}>
                    {listaProdutos && listaProdutos.map((produto) => (
                        <CelulaProduto produto={produto} key={produto.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}
// export const getServerSideProps = async () => {
//     let produtos
//     fetch("http://localhost:8080/recompensas", {
//         method: 'GET',
//         headers : {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//     .then(data => {
//         produtos = JSON.parse(JSON.stringify(data))
//         console.log(produtos) 
//     })
//     console.log(produtos)
//     return{
//         props: {
//             produtos: produtos
//         }
//     }
// }

export default CadastrarProdutos;