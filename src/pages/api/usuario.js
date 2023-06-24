import { createUser } from '@/services/user'

export default async function handler(req, res) {
    const {method} = req
    try{
        switch(method){
            case 'POST':
                const usuario = await createUser(req.body)
                console.log("Dentro da apiNExt", usuario)
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