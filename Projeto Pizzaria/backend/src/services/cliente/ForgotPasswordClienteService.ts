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

        if(!password){
            throw new Error("Digite a nova senha");
        }

        if(!confirmPassword){
            throw new Error("Digite a confirmação de senha");
        }

        const clienteExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email
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

        const senhaSegura = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#./+¨()]{8,}$/;
        if (!senhaSegura.test(password)) {
            throw new Error("A nova senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
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