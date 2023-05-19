
import { styles } from '../styles/CelulaProduto.module.css'

export const CelulaProduto = (produto) => {

    return (
        <div className={styles.container_aluno}>
            <img src={produto.imagemURL} alt="imagem-produto" />
           <div className={styles.nome_desc}>
               <h2>{produto.nome}</h2>
               <h2>{produto.descricao}</h2>
           </div>
        </div>
    )
}

export default CelulaProduto