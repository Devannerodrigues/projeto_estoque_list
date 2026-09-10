import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-lista',
  standalone: true,

  imports: [
    CurrencyPipe,
    RouterLink
  ],

  templateUrl: './produto-lista.html',
  styleUrl: './produto-lista.css'
})
export class ProdutoListaComponent implements OnInit {

  listaProdutos = signal<Produto[]>([]);

  constructor(
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {

    this.produtoService.listar().subscribe({

      next: (dados) => {

        console.log('PRODUTOS RECEBIDOS:', dados);

        this.listaProdutos.set(dados);

      },

      error: (erro) => {

        console.error(
          'ERRO AO LISTAR PRODUTOS:',
          erro
        );

      }

    });

  }

}