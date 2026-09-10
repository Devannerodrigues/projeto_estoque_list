export interface Produto {
  idproduto?: number;
  idsetor: number;
  produto: string;
  descricao_produto: string;
  valor_unitario: number;
  unidade: string;
  estoque: number;
}