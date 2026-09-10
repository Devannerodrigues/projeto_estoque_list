import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private api = 'http://127.0.0.1:8000/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.api}/`);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.api}/${id}`
    );
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(
      `${this.api}/`,
      produto
    );
  }

  atualizar(
    id: number,
    produto: Partial<Produto>
  ): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.api}/${id}`,
      produto
    );
  }

}