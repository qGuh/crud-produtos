import { PrismaClient } from '@prisma/client';
import { CreateProdutoDto } from '../dto/CreateProdutoDto';
import { UpdateProdutoDto } from '../dto/UpdateProdutoDto';

const prisma = new PrismaClient();

export class ProdutoService {
  async criarProduto(data: CreateProdutoDto) {
    return await prisma.produto.create({ data });
  }

  async listarProdutos() {
    return await prisma.produto.findMany();
  }

  async buscarProdutoPorId(id: number) {
    return await prisma.produto.findUnique({ where: { id } });
  }

  async atualizarProduto(id: number, data: UpdateProdutoDto) {
    return await prisma.produto.update({ where: { id }, data });
  }

  async deletarProduto(id: number) {
    return await prisma.produto.delete({ where: { id } });
  }
}
