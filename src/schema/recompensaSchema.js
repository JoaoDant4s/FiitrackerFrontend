
import { z } from 'zod'

export const createRecompensaFormSchema = z.object({
    nome: z.string().nonempty("Nome da recompensa é obrigatório").trim(),
    descricao: z.string().nonempty("Descrição é obrigatório").trim(),
    valor: z.string().nonempty("Valor é obrigatório").transform((valor) => {
        return parseInt(valor.trim())
    }),
    quantidade: z.string().nonempty("Quantidade é obrigatório").transform((valor) => {
        return parseInt(valor.trim())
    }),
    imagemURL: z.string().nonempty("Imagem é obrigatório").trim()
})