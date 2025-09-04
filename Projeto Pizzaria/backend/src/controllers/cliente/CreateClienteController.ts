import {Request, Response} from  'express'
import { CreateClienteService } from '../../services/cliente/CreateClienteService';

class CreateClienteController{
    async handle(req: Request, res: Response){
        const {name, email, password, cpf, data_nasc} = req.body;

        const createClienteService = new CreateClienteService();

        const cliente = await createClienteService.execute({
            name,
            email,
            password,
            cpf,
            data_nasc,
        });

        res.json(cliente)
    }
}

export {CreateClienteController}