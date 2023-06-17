import HeaderNav from "@/components/header";
import Head from "next/head";
import styles from '../../styles/CadastrarCheckin.module.css'
import { CelulaAluno } from "@/components/celulaAluno";

export const CadastrarCheckin = ({alunos}) => {
    return(
        <>  
            <Head>
                <title>Cadastrar Checkin</title>
            </Head>
            <HeaderNav isAdmin={true}/>
            <div className="container_page_with_header">
                <div className={styles.card}>
                    <h1>Buscar aluno</h1>
                    <div className={styles.container_list}>
                        {alunos && alunos.map(aluno => (
                            <CelulaAluno key={aluno.id} aluno={aluno}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = async () => {
    let users;
    await fetch("http://localhost:8080/user", {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        users = JSON.parse(JSON.stringify(data))
        console.log(users) 
    })
    return {
        props: {
            alunos: users
        }
    }
}
export default CadastrarCheckin;