import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

interface ForgotPasswordClienteRequest {
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
}

class ForgotPasswordClienteService {
    async execute({email, cpf, password, confirmPassword, }: ForgotPasswordClienteRequest) {

        if (password !== confirmPassword) {
            throw new Error("As senhas não são iguais");
        }

        const clienteExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email,
                cpf: cpf
            }
        });

        if(!email){
            throw new Error("O email é obrigatório");
        }

        if(!cpf){
            throw new Error("O CPF é obrigatório");
        }

        if (!clienteExiste) {
            throw new Error("Essa conta não existe, Faça seu Cadastro!");
        }

        const passwordHash = await hash(password, 8)

        const senhaIgual = await compare(password, clienteExiste.password);

        if (senhaIgual) {
            throw new Error("A nova senha não pode ser igual a senha antiga");
        }

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