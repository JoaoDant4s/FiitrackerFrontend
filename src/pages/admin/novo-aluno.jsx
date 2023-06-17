import HeaderNav from "@/components/header";
import Head from "next/head";
import styles from '../../styles/NovoAluno.module.css'
import moment from "moment/moment";
import { useState } from "react";


export const NovoAluno = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [dataNascimento, setDataNascimento] = useState()
    const [cpf, setCPF] = useState("")
    const [telefone, setTelefone] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            nomeCompleto: nome,
            dataNascimento,
            cpf,
            telefone,
            email,
            senha,
        }
        let responseAluno = await fetch("http://localhost:3000/api/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        responseAluno = await responseAluno.json()
        let responseUsuario = await fetch("http://localhost:3000/api/usuario", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                senha: data.senha,
                aluno: responseAluno.aluno,
                role: 'user',
                pontos: 0,
                multiplicador: 1.0,
                foto,
                historicoRecompensas: []
            })
        })
        responseUsuario = await responseUsuario.json()
        console.log(responseAluno)
        console.log(responseUsuario)
    }
    
    return(
        <>  
            <Head>
                <title>Novo aluno</title>
            </Head>
            <HeaderNav isAdmin={true}/>
            <form onSubmit={handleSubmit}>
                <div className="container_page_with_header">
                    <div className={styles.card}>
                        <h1>Criar aluno</h1>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="nome"
                                className={styles.label}
                            >
                                Nome Completo:
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="dataNasc"
                                className={styles.label}
                            >
                                Data de Nascimento:
                            </label>
                            <input
                                className={styles.input}
                                type="date"
                                min="01-01-1920"
                                max={moment().format("DD-MM-YYYY")}
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="CPF"
                                className={styles.label}
                            >
                                CPF:
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                value={cpf}
                                onChange={(e) => setCPF(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="telefone"
                                className={styles.label}
                            >
                                Telefone:
                            </label>
                            <input
                                className={styles.input}
                                type="tel"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="email"
                                className={styles.label}
                            >
                                Email:
                            </label>
                            <input
                                className={styles.input}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label
                                htmlFor="password"
                                className={styles.label}
                            >
                                Senha:
                            </label>
                            <input
                                className={styles.input}
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles.button_submit}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NovoAluno;