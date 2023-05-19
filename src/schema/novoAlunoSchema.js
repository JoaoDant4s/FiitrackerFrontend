import { validate } from 'gerador-validador-cpf'
import { z } from 'zod'

export const createAlunoFormSchema = z.object({
    email: z.string().nonempty("O nome do aluno é obrigatório").email("Digite um e-mail válido").toLowerCase().trim(),
    senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres").toLowerCase().trim(),
    nome: z.string().nonempty("O nome é obrigatório").transform(nome => {
        return nome.trim().split(' ').map(palavra => {
            return palavra[0].toLocaleUpperCase.concat(palavra.substring(1))
        }).join(' ')
    }),
    dataNascimento: z.date().nonempty("A data de nascimento é obrigatória"),
    cpf: z.string().nonempty("O CPF é obrigatório").refine((cpf) => {
        return validate(cpf)
    }).trim(),
    telefone: z.string().nonempty("O telefone é obrigatório"),
})