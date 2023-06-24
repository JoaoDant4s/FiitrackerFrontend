import { z } from'zod'

export const loginSchema = z.object({
    username: z.string().nonempty("O nome de usuário é obrigatório").toLowerCase().trim(),
    senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres").toLowerCase().trim()
})