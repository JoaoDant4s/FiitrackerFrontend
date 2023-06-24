import HeaderNav from "@/components/header";
import Head from "next/head";
import styles from '../../styles/NovoAluno.module.css'
import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlunoFormSchema } from "@/schema/novoAlunoSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NovoAluno = (props) => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(createAlunoFormSchema)
    })

    const onSubmit = (async (data) => {
        console.log(data)
        let pessoaCriada
        let usuarioCriado
        await fetch("http://localhost:8080/people", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeCompleto: data.nome,
                dataNascimento: moment(data.dataNascimento).format('DD-MM-YYYY'),
                cpf: data.cpf,
                telefone: data.telefone
            })
        }).then((res) => {
            return res.json()
        }).then((json) => {
            pessoaCriada = json
            if(json.error){
                toast.error("Ocorreu um erro inesperado")
            }else {
                toast.success("Usuário criado com sucesso")
            }
        }).catch((err) => {
            toast.error("Já existe um usuário com esse CPF")
        })
        if(pessoaCriada){
                await fetch("http://localhost:8080/fittracker/cadastrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.senha,
                    pontos: 100,
                    pessoa: {
                        id: pessoaCriada.id
                    }
                })
            }).then(async (res) => {
                usuarioCriado = await res.json()
                console.log(usuarioCriado)
            }).catch((err) => {
                
                console.log(typeof(err))
            })
        }
    })
    
    return(
        <>  
            <Head>
                <title>Novo aluno</title>
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container_page_with_header">
                    <div className={styles.card}>
                        <h1>Criar aluno</h1>
                        <div className={styles.input_container}>
                            <div className={styles.input_nome}>
                                <label
                                    htmlFor="nome"
                                    className={styles.label}
                                >
                                    Nome Completo:
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    {...register("nome")}
                                />
                                {errors.nome && <span className={styles.errors}>{errors.nome.message}</span>}
                            </div>
                            <div className={styles.input_dataNasc}>
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
                                    {...register("dataNascimento")}
                                />
                                {errors.dataNascimento && <span className={styles.errors}>{errors.dataNascimento.message}</span>}
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.input_tel}>
                                <label
                                    htmlFor="telefone"
                                    className={styles.label}
                                >
                                    Telefone:
                                </label>
                                <input
                                    className={styles.input}
                                    type="tel"
                                    {...register("telefone")}
                                />
                                {errors.telefone && <span className={styles.errors}>{errors.telefone.message}</span>}
                            </div>
                            <div className={styles.input_cpf}>
                                <label
                                    htmlFor="CPF"
                                    className={styles.label}
                                >
                                    CPF:
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    {...register("cpf")}
                                />
                                {errors.cpf && <span className={styles.errors}>{errors.cpf.message}</span>}
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.input_user}>
                                <label
                                    htmlFor="username"
                                    className={styles.label}
                                >
                                    Username:
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    {...register("username")}
                                />
                                {errors.username && <span className={styles.errors}>{errors.username.message}</span>}
                            </div>
                            <div className={styles.input_pass}>
                                <label
                                    htmlFor="password"
                                    className={styles.label}
                                >
                                    Senha:
                                </label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    {...register("senha")}
                                />
                                {errors.senha && <span className={styles.errors}>{errors.senha.message}</span>}
                            </div>
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