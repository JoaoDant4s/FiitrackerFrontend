import { addDoc, collection, getDoc } from "firebase/firestore"
import { db } from "../../firebase-config"


export async function createAluno(body){
    console.log("dentro do create aluno")
    console.log(body)
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
