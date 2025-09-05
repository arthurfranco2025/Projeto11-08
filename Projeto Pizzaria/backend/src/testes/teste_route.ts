import {Router, Request, Response} from 'express'
import { CreateClienteController } from './controllers/cliente/CreateClienteController'
import { AuthClienteController } from './controllers/cliente/AuthClienteController'

const routerTeste = Router()


//routerTeste.get('/testeRota', (req: Request, res: Response) => {
//    res.json({message: 'Teste conexão de rota'})
//})

//routerTeste.post('/criaCliente', new CreateClienteController().handle)
routerTeste.post('/login', new AuthClienteController().handle)

export {routerTeste}