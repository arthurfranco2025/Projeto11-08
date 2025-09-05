import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";

interface ForgotPasswordClienteRequest {
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
}

class ForgotPasswordClienteService {
    async execute({
        email, cpf, password, confirmPassword, }: ForgotPasswordClienteRequest) {

        if (password !== confirmPassword) {
            throw new Error("As senhas não são iguais");
        }

        const clienteExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email,
                cpf: cpf
            }
        });

        if (!clienteExiste) {
            throw new Error("Essa conta não existe, Faça seu Cadastro!");
        }

        const passwordHash = await hash(password, 8)

        const cliente = await prismaClient.cliente.update({
            where: {
                id: clienteExiste.id
            },
            data: {
                password : passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return cliente;
    }
}

export { ForgotPasswordClienteService };