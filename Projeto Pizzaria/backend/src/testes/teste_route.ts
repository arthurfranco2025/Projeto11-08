import {Router, Request, Response} from 'express'
import { CreateClienteController } from './controllers/cliente/CreateClienteController'

const routerTeste = Router()

//routerTeste.get('/testeRota', (req: Request, res: Response) => {
//    res.json({message: 'Teste conexão de rota'})
//})

//routerTeste.post('/criaCliente', new CreateClienteController().handle)

export {routerTeste}