import HeaderNav from "@/components/header";
import Head from "next/head";
import styles from '../../styles/CadastrarCheckin.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from "@/context/UserContext"

import { CelulaAluno } from "@/components/celulaAluno";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const CadastrarCheckin = ({alunos}) => {
    const [filtroNome, setFiltroNome] = useState('');
    const { user, setUser } = useContext(UserContext)
  
    const handleFiltroNomeChange = (event) => {
      setFiltroNome(event.target.value);
    };

    const handleCelulaAlunoClick = async (id) => {
        await fetch(`http://localhost:8080/checkin/${id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            },
            body: {
                userId: id
            }
        })
        console.log("oi")
    }
  
    const alunosFiltrados = alunos.filter(aluno =>
      aluno.pessoa?.nomeCompleto.toLowerCase().includes(filtroNome.toLowerCase())
    );
  
    return(
      <>  
        <Head>
          <title>Cadastrar Checkin</title>
        </Head>
        <HeaderNav isAdmin={true}/>
        <div className="container_page_with_header">
          <div className={styles.card}>
            <h1>Buscar aluno</h1>
            <div className={styles.search}>
                <input 
                className={styles.input_busca} 
                type="text"
                value={filtroNome}
                onChange={handleFiltroNomeChange}
                placeholder="Digite um nome" />
                <MagnifyingGlassIcon className={styles.icon_search}></MagnifyingGlassIcon>
            </div>
            <div className={styles.container_list}>
              {alunosFiltrados.map(aluno => (
                <button className={styles.aluno_card} key={aluno.id}>                
                    <CelulaAluno aluno={aluno} onClick={handleCelulaAlunoClick(aluno.id)}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

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