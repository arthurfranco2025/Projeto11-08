import {Router, Request, Response} from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { CreateClienteController } from './controllers/cliente/CreateClienteController'
import { AuthClienteController } from './controllers/cliente/AuthClienteController'
import { EditClienteController } from './controllers/cliente/EditClienteController'

const routerTeste = Router()

//routerTeste.get('/testeRota', (req: Request, res: Response) => {
//    res.json({message: 'Teste conexão de rota'})
//})

//routerTeste.post('/cadastro', new CreateClienteController().handle)
//routerTeste.post('/login', new AuthClienteController().handle)
//routerTeste.put("/edit", isAuthenticated, new EditClienteController().handle);

export {routerTeste}