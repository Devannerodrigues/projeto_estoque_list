import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit {

  produto: Produto = {
    idproduto: 0,
    idsetor: 0,
    produto: '',
    descricao_produto: '',
    valor_unitario: 0,
    unidade: '',
    estoque: 0
  };

  idproduto: number | null = null;

  editando = false;

  mensagem = '';

  erro = '';

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.idproduto = Number(id);

      this.editando = true;

      this.buscarProduto();

    }

  }

  buscarProduto(): void {

    if (!this.idproduto) {
      return;
    }

    this.produtoService
      .buscarPorId(this.idproduto)
      .subscribe({

        next: (dados: Produto) => {

          this.produto = dados;

        },

        error: (erro: any) => {

          console.error(
            'ERRO AO BUSCAR PRODUTO:',
            erro
          );

          this.erro =
            'Não foi possível carregar o produto.';

        }

      });

  }

  salvar(): void {

    this.mensagem = '';

    this.erro = '';

    if (!this.validarFormulario()) {
      return;
    }

    if (this.editando && this.idproduto) {

      this.atualizar();

    } else {

      this.cadastrar();

    }

  }

  cadastrar(): void {

    this.produtoService
      .cadastrar(this.produto)
      .subscribe({

        next: (dados: Produto) => {

          console.log(
            'PRODUTO CADASTRADO:',
            dados
          );

          this.mensagem =
            'Produto cadastrado com sucesso!';

          this.limparFormulario();

        },

        error: (erro: any) => {

          console.error(
            'ERRO AO CADASTRAR:',
            erro
          );

          this.erro =
            'Não foi possível cadastrar o produto.';

        }

      });

  }

  atualizar(): void {

    if (!this.idproduto) {
      return;
    }

    this.produtoService
      .atualizar(
        this.idproduto,
        this.produto
      )
      .subscribe({

        next: (dados: Produto) => {

          console.log(
            'PRODUTO ATUALIZADO:',
            dados
          );

          this.mensagem =
            'Produto alterado com sucesso!';

        },

        error: (erro: any) => {

          console.error(
            'ERRO AO ATUALIZAR:',
            erro
          );

          this.erro =
            'Não foi possível alterar o produto.';

        }

      });

  }

  validarFormulario(): boolean {

    if (!this.produto.produto.trim()) {

      this.erro =
        'Informe o nome do produto.';

      return false;

    }

    if (!this.produto.descricao_produto.trim()) {

      this.erro =
        'Informe a descrição do produto.';

      return false;

    }

    if (this.produto.idsetor <= 0) {

      this.erro =
        'Informe o setor.';

      return false;

    }

    if (this.produto.valor_unitario < 0) {

      this.erro =
        'O valor não pode ser negativo.';

      return false;

    }

    if (!this.produto.unidade.trim()) {

      this.erro =
        'Informe a unidade.';

      return false;

    }

    if (this.produto.estoque < 0) {

      this.erro =
        'O estoque não pode ser negativo.';

      return false;

    }

    return true;

  }

  limparFormulario(): void {

    this.produto = {
      idsetor: 0,
      produto: '',
      descricao_produto: '',
      valor_unitario: 0,
      unidade: '',
      estoque: 0
    };

  }

  voltar(): void {

    this.router.navigate(['/estoque']);

  }

}