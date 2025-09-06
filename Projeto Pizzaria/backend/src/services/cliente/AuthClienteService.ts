import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    cpf: string;
    password: string;
}

class AuthClienteService {
    async execute({ email, cpf, password }: AuthRequest) {

        const cliente = await prismaClient.cliente.findFirst({
            where: {
                email: email,
                cpf: cpf
            }
        })

        if (!cliente) {
            throw new Error("Usuário não encontrado")
        }

        if (!email && !cpf) {
            throw new Error("Insira um email ou CPF válido");
        }

        if (!password) {
            throw new Error("Senha é obrigatório")
        }

        const passwordMatch = await compare(password, cliente.password)

        if (!passwordMatch) {
            throw new Error('Usuário ou senha incorretos')
        }


        const token = sign(
            {
                email: cliente.email,
                password: cliente.password
            },
            'segredo_leticia',
            {
                subject: cliente.id,
                expiresIn: '30d'

            }
        )

        return {
            id: cliente.id,
            name: cliente.name,
            email: cliente.email,
            token: token
        }
    }
}

export { AuthClienteService }