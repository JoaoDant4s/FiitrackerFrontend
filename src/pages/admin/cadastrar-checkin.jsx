import HeaderNav from "@/components/header";
import Head from "next/head";
import styles from '../../styles/CadastrarCheckin.module.css'
import { CelulaAluno } from "@/components/celulaAluno";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const CadastrarCheckin = ({alunos}) => {
    return(
        <>  
            <Head>
                <title>Cadastrar Checkin</title>
            </Head>
            <HeaderNav isAdmin={true}/>
            <div className="container_page_with_header">
                <div className={styles.card}>
                    <div className={styles.search}>
                        <input className={styles.input_busca} placeholder="nome do usuario" />
                        <MagnifyingGlassIcon className={styles.icon_search}></MagnifyingGlassIcon>
                    </div>
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