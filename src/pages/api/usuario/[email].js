import { getUserByEmail } from "@/services/user";


export default async function handler(req, res) {
    const {method} = req
    try{
        switch(method){
            case 'GET':
                const user = await getUserByEmail(req.query.email)
                console.log("aq n deu erro")
                res.status(200).json(user)
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