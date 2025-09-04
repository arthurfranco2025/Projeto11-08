import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface ClienteRequest{
    name: string,
    email: string,
    password: string,
    cpf: string,
    data_nasc: Date
}

class CreateClienteService{
    async execute({name, email, password, cpf, data_nasc}: ClienteRequest){
        
        if(!email){
            throw new Error("Email incorreto")
        }

        if(!cpf){
            throw new Error('CPF é obrigatório')
        }

        if(!password){
            throw new Error('Senha é obrigatória')
        }

        if(!data_nasc){
            throw new Error('Data de Nascimento é obrigatória')
        }

        const clienteAlreadyExists = await prismaClient.cliente.findFirst({
            where: {
                email : email
            }
        })

        if(clienteAlreadyExists){
            throw new Error("O Clliente já existe")
        }

        const passwordHash = await hash(password, 8)

        const dataDefault = data_nasc + 'T00:00:00.000Z'

        const cliente = await prismaClient.cliente.create({
            data: {
                name: name,
                email : email,
                password : passwordHash,
                cpf: cpf,
                data_nasc: dataDefault,
            },
            select:{
                id: true,
                name: true,
                email: true,
                data_nasc: true,
            }
        })

        return cliente
    }
}

export {CreateClienteService}