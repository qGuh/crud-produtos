import express, { Request, Response, Router } from 'express';
import { ProdutoService } from '../service/ProdutoService';
import { CreateProdutoDto } from '../dto/CreateProdutoDto';
import { UpdateProdutoDto } from '../dto/UpdateProdutoDto';
import { validate } from 'class-validator';

const router: Router = express.Router();
const service = new ProdutoService();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const dto = Object.assign(new CreateProdutoDto(), req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json(errors);
    return;
  }
  const produto = await service.criarProduto(dto);
  res.json(produto);
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const produtos = await service.listarProdutos();
  res.json(produtos);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const produto = await service.buscarProdutoPorId(Number(req.params.id));
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const dto = Object.assign(new UpdateProdutoDto(), req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json(errors);
    return;
  }
  const produto = await service.atualizarProduto(Number(req.params.id), dto);
  res.json(produto);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  await service.deletarProduto(Number(req.params.id));
  res.status(204).send();
});

export default router;
