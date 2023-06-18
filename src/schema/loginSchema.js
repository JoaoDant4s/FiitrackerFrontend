import { z } from'zod'

export const loginSchema = z.object({
    email: z.string().nonempty("O e-mail é obrigatório").email("Digite um e-mail válido").toLowerCase().trim(),
    senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres").toLowerCase().trim()
})