import HeaderNav from "@/components/header"
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/CadastrarProduto.module.css'
import { AiOutlineSearch } from "react-icons/ai"
import CelulaProduto from "@/components/celulaProduto";
import Modal from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecompensaFormSchema } from "@/schema/recompensaSchema";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CadastrarProdutos = () => {
    const [listaFiltrada, setListaFiltrada] = useState([])
    const [search, setSearch] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [produtos, setProdutos] = useState([])
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(createRecompensaFormSchema)
    })

    useEffect(() => {
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

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const filtrarProdutos = (string) => {
        console.log(string)
        setSearch(string)
          const filteredList = produtos.filter((recompensa) => {
              return recompensa.nome.toLowerCase().includes(search.toLowerCase())
          })
          setListaFiltrada(filteredList)
      }

    const onSubmit = async (data) => {
        await fetch("http://localhost:8080/recompensa", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: data.nome,
                descricao: data.descricao,
                valor: data.valor,
                quantidade: data.quantidade,
                imagemURL: data.imagemURL
            })
        }).then(async (res) => {
            return res.json()
        }).then((json) => {
            if(json.error){
                toast.error("Ocorreu um erro inesperado")
            }else {
                toast.success("Recompensa criada com sucesso")
            }
        })
    }

    return (
        <>
            <Head>
                <title>Cadastrar Produtos</title>
            </Head>
            <HeaderNav isAdmin={true}/>
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
                            type="search"
                            className={styles.search_box}
                            value={search}
                            onChange={(e) => filtrarProdutos(e.target.value)}
                            placeholder="Buscar produto"
                        />
                        <AiOutlineSearch className={styles.search_icon} />
                    </div>
                    <button className={styles.button_new_product} onClick={() => openModal()}>Novo produto</button>
                </div>
                <Modal isOpen={modalOpen} onClose={closeModal}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.container}>
                            <div className={styles.input_container}>
                                <input
                                    placeholder="Digite um nome"
                                    className={styles.input}
                                    type="text"
                                    {...register("nome")}
                                />
                                <p className={styles.errors}>{errors?.nome?.message}</p>
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    placeholder="Digite uma descrição"
                                    className={styles.input}
                                    type="text"
                                    {...register("descricao")}
                                />
                                <p className={styles.errors}>{errors?.descricao?.message}</p>
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    placeholder="Digite um valor"
                                    className={styles.input}
                                    type="number"
                                    {...register("valor")}
                                />
                                <p className={styles.errors}>{errors?.valor?.message}</p>
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    placeholder="Digite uma quantidade"
                                    className={styles.input}
                                    type="number"
                                    {...register("quantidade")}
                                />
                                <p className={styles.errors}>{errors?.quantidade?.message}</p>
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    placeholder="URL da imagem"
                                    className={styles.input}
                                    type="text"
                                    {...register("imagemURL")}
                                
                                />
                                <p className={styles.errors}>{errors?.imagemURL?.message}</p>
                            </div>
                            <div className={styles.button_container}>
                                <button type="submit" className={styles.button_submit}>
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </form>                  
                </Modal>
                <div className={styles.products_container}>
                {produtos && search ? listaFiltrada?.map((produto) => (
                        <CelulaProduto produto={produto} key={produto.id}/>
                    )) : produtos?.map((produto) => (
                      <CelulaProduto produto={produto} key={produto.id}/>
                  ))}
                </div>
            </div>
        </>
    )
}

export default CadastrarProdutos;