import { Routes } from '@angular/router';
import { ErrorComponent } from './publico/pages/error/error.component';
import HomeComponent from './publico/pages/home/home.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '', // ruta inicial
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home', // ruta de home
    loadComponent: () => import('./publico/pages/home/home.component').then((m) => HomeComponent),
  },
  {
    path: 'administrador',
    children: [
      {
        path: 'producto', // rutas de productos
        canActivate: [authGuard],
        loadChildren: () => import('./administrador/productos/productos.routes').then((r) => r.routesProducto),
      },
      {
        path: 'usuario', // rutas de usuario
        loadComponent: () =>
          import('./administrador/usuarios/pages/usuario/usuario.component').then((m) => m.UsuarioComponent),
      },
    ],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
