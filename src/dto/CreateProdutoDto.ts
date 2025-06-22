import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
nome!: string;
preco!: number;
quantidade!: number;
}
