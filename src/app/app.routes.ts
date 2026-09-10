import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'estoque',
    pathMatch: 'full'
  },

  {
    path: 'estoque',
    loadComponent: () =>
      import('./pages/produto-lista/produto-lista')
        .then(m => m.ProdutoListaComponent)
  },

  {
    path: 'produto/novo',
    loadComponent: () =>
      import('./pages/produto-form/produto-form')
        .then(m => m.ProdutoForm)
  },

  {
    path: 'produto/editar/:id',
    loadComponent: () =>
      import('./pages/produto-form/produto-form')
        .then(m => m.ProdutoForm)
  }

];