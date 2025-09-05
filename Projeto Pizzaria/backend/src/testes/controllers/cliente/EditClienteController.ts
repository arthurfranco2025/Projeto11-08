import { Request, Response } from "express";
import { EditClienteService } from "../../services/cliente/EditClientService";
import { AuthRequest } from "../../../middlewares/isAuthenticated";

class EditClienteController {
    async handle(req: AuthRequest, res: Response) {
        const { novoName, novoEmail, confirmEmail, novoPassword, confirmPassword } =
            req.body;

        // Verifica se o middleware já passou o userId
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        const editClienteService = new EditClienteService();

        try {
            const clienteAtualizado = await editClienteService.execute({
                userId: req.userId, // vem do token
                novoName,
                novoEmail,
                confirmEmail,
                novoPassword,
                confirmPassword,
            });

            return res.status(200).json(clienteAtualizado);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export { EditClienteController };