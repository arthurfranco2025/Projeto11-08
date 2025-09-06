import { Request, Response } from "express";
import { EditClienteService } from "../../services/cliente/EditClienteService";

interface AuthenticatedRequest extends Request {
  user_id?: string; // compatível com o middleware original
}

class EditClienteController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const { novoName, novoEmail, confirmEmail, oldPassword, novoPassword, confirmPassword } =
      req.body;

    // Verifica se o middleware já passou o user_id
    if (!req.user_id) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const editClienteService = new EditClienteService();

    try {
      const clienteAtualizado = await editClienteService.execute({
        userId: req.user_id, // vem do token via middleware
        novoName,
        novoEmail,
        confirmEmail,
        oldPassword,
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