import prismaClient from "../../../prisma";
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
}

class AuthClienteService{
    async execute({ email, password} : AuthRequest){
        
        const cliente = await prismaClient.cliente.findFirst({
            where:{
                email: email
            }
        })

        if(!cliente){
            throw new Error("Usuário ou senha incorretos")
        }

        if(!email){
            throw new Error("Email é obrigatório")
        }

        if(!password){
            throw new Error("Senha é obrigatório")
        }

        const passwordMatch = await compare(password, cliente.password)

        if(!passwordMatch){
            throw new Error('Usuário ou senha incorretos')
        }

        const token = sign (
            {
                name: cliente.name,
                email: cliente.email
            },
            'segredo_leticia',
            {
                subject: cliente.id,
                expiresIn: '30d'
                
            }
        )

        return{
            id: cliente.id,
            name: cliente.name,
            email: cliente.email,
            token: token
        }
    }
}

export {AuthClienteService}