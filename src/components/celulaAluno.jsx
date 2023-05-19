
import  styles  from '../styles/CelulaAluno.module.css'

export const CelulaAluno = ({aluno}) => {
    console.log(aluno)
    return (
        <div className={styles.container_aluno}>
            {aluno && (
                <>
                    <h2>{aluno.pessoa?.nomeCompleto}</h2>
                    <h2>{aluno.pessoa?.dataNascimento}</h2>
                </>
            )}
        </div>
    )
}

export default CelulaAluno