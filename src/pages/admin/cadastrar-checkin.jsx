import { CelulaAluno } from "@/components/celulaAluno";
import HeaderNav from "@/components/header";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from "next/head";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/CadastrarCheckin.module.css';

export const CadastrarCheckin = ({alunos}) => {
    const [filtroNome, setFiltroNome] = useState('');
  
    const handleFiltroNomeChange = (event) => {
      setFiltroNome(event.target.value);
    };

    const handleCelulaAlunoClick = async (id) => {
      console.log(new Date())
      console.log(id)
      const response = await fetch(`http://localhost:8080/checkin/${id}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checkin: {

          }
        })
      })
      if(response.status === 201){
        toast.success("Checkin cadastrado com sucesso")
      } else {
        toast.error("O aluno já fez checkin hoje")
      }
    }
  
    const alunosFiltrados = alunos.filter(aluno =>
      aluno.pessoa?.nomeCompleto.toLowerCase().includes(filtroNome.toLowerCase())
    );
  
    return(
      <>  
        <Head>
          <title>Cadastrar Checkin</title>
        </Head>
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
                <button 
                  className={styles.aluno_card} 
                  key={aluno.id}
                  onClick={() => handleCelulaAlunoClick(aluno.id)}
                >                
                    <CelulaAluno aluno={aluno} />
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
    })
    return {
        props: {
            alunos: users
        }
    }
}
export default CadastrarCheckin;