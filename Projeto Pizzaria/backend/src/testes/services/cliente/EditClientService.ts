import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";

interface EditClienteRequest {
  userId: string; // ID vindo do token
  novoName?: string;
  novoEmail?: string;
  confirmEmail?: string;
  novoPassword?: string;
  confirmPassword?: string;
}

class EditClienteService {
  async execute({
    userId,
    novoName,
    novoEmail,
    confirmEmail,
    novoPassword,
    confirmPassword,
  }: EditClienteRequest) {
    // Objeto para armazenar os dados que serão atualizados
    const dataToUpdate: { name?: string; email?: string; password?: string } =
      {};

    // Validações e atribuições condicionais
    if (novoName) {
      dataToUpdate.name = novoName;
    }

    if (novoEmail) {
      if (novoEmail !== confirmEmail) {
        throw new Error("Os e-mails não são os mesmos.");
      }

      // Evita que o usuário mude para um e-mail que já existe, mas ignora o próprio e-mail do cliente.
      const clienteComMesmoEmail = await prismaClient.cliente.findFirst({
        where: {
          email: novoEmail,
          NOT: { id: userId }, // ignora o próprio usuário
        },
      });

      if (clienteComMesmoEmail) {
        throw new Error("Já existe um cliente com esse e-mail.");
      }

      dataToUpdate.email = novoEmail;
    }

    if (novoPassword) {
      if (novoPassword !== confirmPassword) {
        throw new Error("As senhas não são as mesmas.");
      }
      // Usa o hash da senha para atualizar
      const passwordHash = await hash(novoPassword, 8);
      dataToUpdate.password = passwordHash;
    }

    // Atualiza o cliente usando o ID do token
    const clienteAtualizado = await prismaClient.cliente.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return clienteAtualizado;
  }
}

export { EditClienteService };