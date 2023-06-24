import { validate } from 'gerador-validador-cpf'
import { z } from 'zod'

export const createAlunoFormSchema = z.object({
    username: z.string().nonempty("O username do aluno é obrigatório").toLowerCase().trim(),
    senha: z.string().nonempty("A senha é obrigatória").min(6, "A senha precisa de no mínimo 6 caracteres").toLowerCase().trim(),
    nome: z.string().nonempty("O nome é obrigatório").trim(),
    dataNascimento: z.string().nonempty("A data é obrigatória"),
    cpf: z.string().nonempty("O CPF é obrigatório").transform(cpf => {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        if(regex.exec(cpf)){
            return cpf
        }
        return cpf.trim().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }).refine((cpf) => {
        return validate(cpf)
    }, "CPF inválido"),
    telefone: z.string().nonempty("O telefone é obrigatório").transform(telefone => {
        return telefone.trim().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }).refine((tel) => {
        const regex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        return regex.exec(tel)
    }, "Telefone inválido"),
})