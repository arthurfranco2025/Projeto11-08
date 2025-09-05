import {Router, Request, Response} from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { CreateClienteController } from './controllers/cliente/CreateClienteController'
import { AuthClienteController } from './controllers/cliente/AuthClienteController'
import { EditClienteController } from './controllers/cliente/EditClienteController'
import { ForgotPasswordClienteController } from './controllers/cliente/ForgotPasswordClienteController'

const routerTeste = Router()

//routerTeste.get('/testeRota', (req: Request, res: Response) => {
//    res.json({message: 'Teste conexão de rota'})
//})

const forgotPasswordClienteController = new ForgotPasswordClienteController();

//routerTeste.post('/cadastro', new CreateClienteController().handle)
//routerTeste.post('/login', new AuthClienteController().handle)
//ERRADO routerTeste.put("/edit", isAuthenticated, new EditClienteController().handle);
//routerTeste.post('/esqueciMinhaSenha', forgotPasswordClienteController.handle.bind(forgotPasswordClienteController));

export {routerTeste}