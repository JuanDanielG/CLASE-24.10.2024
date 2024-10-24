import { Routes } from '@angular/router';
import { HomeComponent } from './publico/pages/home/home.component';
import { ProductosComponent } from './administrador/productos/pages/productos/productos.component';
import { UsuarioComponent } from './administrador/usuarios/pages/usuario/usuario.component';
import { ErrorComponent } from './publico/pages/error/error.component';

export const routes: Routes = [
    {
        path: ' ', // significa que apenas ingreso no hay nada en la url
        redirectTo: 'home',
        pathMatch: "full"
        //component : HomeComponent // lo que hay en el component lo pega en la pagina

    },
    {
        path: 'home', // ruta de home
        component: HomeComponent
    },
    {
        path: 'administrador/producto', // ruta administrador producto
        component : ProductosComponent
    },
    {
        path: "administrador/usuario",  //ruta administrador usuario
        component : UsuarioComponent
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
