import {Router, Request, Response} from 'express'

const routerTeste = Router()

routerTeste.get('/testeRota', (req: Request, res: Response) => {
    res.json({message: 'Teste conexão de rota'})
})

export {routerTeste}