import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma/index";
import { compare, hash } from "bcryptjs";

const prisma = prismaClient;

interface EditClienteRequest {
  userId: string; // ID vindo do token
  novoName?: string;
  novoEmail?: string;
  confirmEmail?: string;
  oldPassword?: string;
  novoPassword?: string;
  confirmPassword?: string;
}

class EditClienteService {
  async execute({
    userId,
    novoName,
    novoEmail,
    confirmEmail,
    oldPassword,
    novoPassword,
    confirmPassword,
  }: EditClienteRequest) {
    // Objeto para armazenar os dados que serão atualizados
    const dataToUpdate: { name?: string; email?: string; password?: string } =
      {};

    const clienteAtual = await prisma.cliente.findUnique({
      where: { id: userId },
    });

    // Validações e atribuições condicionais
    if (novoName) {
      const nomeAtual = clienteAtual?.name;

      if (novoName === nomeAtual) {
        throw new Error("O novo nome é igual ao atual.");
      }

      dataToUpdate.name = novoName;
    }

    if (novoName === clienteAtual?.name || novoEmail === clienteAtual?.email || novoPassword === clienteAtual?.password) {
      throw new Error("Os novos dados são iguais aos atuais, caso queira manter os dados, deixe-os em branco.");
    }

    if (novoEmail) {
      if (novoEmail !== confirmEmail) {
        throw new Error("O email e a confirmação de email não são os mesmos.");
      }

      const clienteComMesmoEmail = await prismaClient.cliente.findFirst({
        where: {
          email: novoEmail
        },
      });

      if (clienteAtual.email === novoEmail) {
        throw new Error("O novo email é igual ao atual.");
      }

      if (clienteComMesmoEmail) {
        throw new Error("Já existe um cliente com esse e-mail.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
        throw new Error("Email inválido");
      }

      dataToUpdate.email = novoEmail;
    }

    if (novoPassword) {
      if (!oldPassword) {
        throw new Error("A senha antiga é obrigatória para alterar a senha.");
      }

      const senhaAtualCorreta = await compare(oldPassword, clienteAtual!.password);
      if (!senhaAtualCorreta) {
        throw new Error("A senha antiga está incorreta.");
      }

      const senhaIgual = await compare(novoPassword, clienteAtual!.password);
      if (senhaIgual) {
        throw new Error("A nova senha não pode ser igual à senha antiga.");
      }

      if (novoPassword !== confirmPassword) {
        throw new Error("A nova senha e a confirmação de senha não são iguais.");
      }

      const senhaSegura = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#./+¨()]{8,}$/;
      if (!senhaSegura.test(novoPassword)) {
        throw new Error("A nova senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
      }

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