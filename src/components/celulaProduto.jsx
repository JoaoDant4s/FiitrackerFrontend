
import { useRouter } from 'next/router';
import  styles  from '../styles/CelulaProduto.module.css'
import { RiCopperCoinLine } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CelulaProduto = ({produto, user}) => {
    const rota = useRouter()
    const deleteItem = async (id) => {
        console.log(id)
        await fetch(`http://localhost:8080/recompensa/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if(res.status === 200){
                toast.success("Recompensa deletada com sucesso")
            }else {
                toast.error("Ocorreu um erro inesperado")
            }
        })
    }

    const resgatarItem = async (id) => {
        await fetch(`http://localhost:8080/recompensa/${user.id}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if(res.status === 200){
                toast.success("Recompensa resgatada com sucesso")
            } else {
                toast.error("Ocorreu um erro inesperado")
            }
        })
    }
    return (
        <div className={styles.container_item}>
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
            <div className={styles.container_produto}>
                <img src={produto?.imagemURL ? produto.imagemURL : "https://static.vecteezy.com/ti/vetor-gratis/p1/7451786-um-contorno-icone-isometrico-de-produto-desconhecido-vetor.jpg"} alt="imagem-produto" />
                <div className={styles.nome_desc}>
                   <h2>{produto?.nome}</h2>
                   <p>{produto?.descricao}</p>
                   <div>
                        <div>
                            <RiCopperCoinLine className={styles.coin}/>
                            <h3>{produto?.valor}</h3>
                            <h4>x{produto?.quantidade}</h4>
                        </div>
                        {rota?.pathname.includes('cadastrar') ? (
                            <button className={styles.delete_button} onClick={() => deleteItem(produto.id)}>Excluir</button>
                        ) : (                         
                            <button className={user?.pontos < produto.valor ? styles.redeem_button_disabled : styles.redeem_button} onClick={() => resgatarItem(produto.id)}>Resgatar</button>
                        )}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default CelulaProduto