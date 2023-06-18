import Error from "next/error";
import { createAluno } from "@/services/aluno";

export default async function handler(req, res) {
    const {method} = req
    try{
        switch(method){
            case 'POST':
                const aluno = await createAluno(req.body)
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