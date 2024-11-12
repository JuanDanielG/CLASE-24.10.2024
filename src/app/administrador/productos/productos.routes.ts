import { Routes } from '@angular/router';

export const routesProducto: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/productos/productos.component').then((c) => c.ProductosComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/productos-add/productos-add.component').then((c) => c.ProductosAddComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/productos-edit/productos-edit.component').then((c) => c.ProductosEditComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/productos-unico/productos-unico.component').then((c) => c.ProductosUnicoComponent),
  },
];
