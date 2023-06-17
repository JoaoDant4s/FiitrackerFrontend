import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import Error from "next/error";

export default async function handler(req, res) {
    const {method} = req
    try{
        switch(method){
            case 'POST':
                const aluno = await CriarAluno(req.body)
                if(!aluno){
                    throw new Error("Não foi possível criar o aluno")
                }
                res.status(200).json({ 
                    aluno,
                    message: `Aluno ${aluno.nomeCompleto} criado com sucesso`,
                    statusCode: 200
                })
                break;
            default:
                res.status(405).json({
                    statusCode: 405,
                    message: `Method ${method} not allowed`
                })
        }
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: err.message
        })
    }
}
const CriarAluno = async (body) => {
    const aluno = {
        nomeCompleto: body.nomeCompleto,
        telefone: body.telefone,
        dataNascimento: body.dataNascimento,
        cpf: body.cpf,
    }
    const alunoRef = await addDoc(collection(db, "aluno"), aluno)
    const alunoSnap = await getDoc(alunoRef)
    let alunoCriado = {
        nomeCompleto: alunoSnap.data().nomeCompleto,
        telefone: alunoSnap.data().telefone,
        dataNascimento: alunoSnap.data().dataNascimento,
        cpf: alunoSnap.data().cpf,
        id: alunoSnap.id,
    }
    return alunoCriado
}
  