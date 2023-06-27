
import  styles  from '../styles/CelulaProduto.module.css'
import { RiCopperCoinLine } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CelulaProduto = (item) => {

    const deleteItem = async (id) => {
        console.log(id)
        await fetch(`http://localhost:8080/recompensa/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            return res.json()
        }).then((json) => {
            if(json.error){
                toast.error("Ocorreu um erro inesperado")
            }else {
                toast.success("Recompensa deletada com sucesso")
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
                <img src={item?.produto?.imagemURL ? item.produto.imagemURL : "https://static.vecteezy.com/ti/vetor-gratis/p1/7451786-um-contorno-icone-isometrico-de-produto-desconhecido-vetor.jpg"} alt="imagem-produto" />
                <div className={styles.nome_desc}>
                   <h2>{item?.produto?.nome}</h2>
                   <p>{item?.produto?.descricao}</p>
                   <div>
                        <div>
                            <RiCopperCoinLine className={styles.coin}/>
                            <h3>{item?.produto?.valor}</h3>
                            <h4>x{item?.produto?.quantidade}</h4>
                        </div>
                        <button className={styles.delete_button} onClick={() => deleteItem(item.produto.id)}>Excluir</button>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default CelulaProduto