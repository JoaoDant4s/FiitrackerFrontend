import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase-config'

export default async function handler(req, res) {
    const {method} = req
    try{
        switch(method){
            case 'POST':
                const usuario = await CriarUsuario(req.body)
                if(!usuario){
                    throw new Error("Não foi possível criar o aluno")
                }
                res.status(200).json({ 
                    usuario,
                    message: `Usuario ${usuario.email} criado com sucesso`,
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

const CriarUsuario = async (user) => {
    const { createHash } = require('crypto')
    user.aluno = doc(db, `aluno/${user.aluno.id}`)
    user.senha = createHash('sha256').update(user.senha).digest('hex')
    const userRef = await addDoc(collection(db, "usuario"), user)
    const userSnap = await getDoc(userRef)
    const usuarioCriado = userSnap.data()
    return usuarioCriado 
}