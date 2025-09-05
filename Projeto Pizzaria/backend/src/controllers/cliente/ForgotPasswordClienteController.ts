import { Request, Response } from "express";
import { ForgotPasswordClienteService } from "../../services/cliente/ForgotPasswordClienteService";

class ForgotPasswordClienteController {
    async handle(req: Request, res: Response) {
        console.log(req.headers);
        console.log(req.body);
        const { email, cpf, password, confirmPassword } = req.body;

        const forgotPasswordClienteService = new ForgotPasswordClienteService();

        try {
            const senhaAtualizada = await forgotPasswordClienteService.execute({
                email,
                cpf,
                password,
                confirmPassword,
            });

            return res.status(200).json(senhaAtualizada);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export { ForgotPasswordClienteController };     
