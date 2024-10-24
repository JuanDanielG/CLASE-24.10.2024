import { Routes } from '@angular/router';
import { ProductosComponent } from './administrador/productos/pages/productos/productos.component';

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
        loadComponent: ()=> import ("./publico/pages/home/home.component")  // cuando ingrese importeme la siguiente ruta
    },
    {
        path: "administrador",
        children :[
            {
                path: 'producto', // ruta administrador producto
                loadComponent: ()=> import ("./administrador/productos/pages/productos/productos.component").then( m => m.ProductosComponent)  // cuando ingrese importeme la siguiente ruta
            },
            {
                path: "usuario",  //ruta administrador usuario
                loadComponent: () => import ("./administrador/usuarios/pages/usuario/usuario.component")
            },
        ] 
    },
    {
        path: 'administrador/producto', // ruta administrador producto
        loadComponent: ()=> import ("./administrador/productos/pages/productos/productos.component").then( m => m.ProductosComponent)  // cuando ingrese importeme la siguiente ruta
    },
    {
        path: "administrador/usuario",  //ruta administrador usuario
        loadComponent: () => import ("./administrador/usuarios/pages/usuario/usuario.component")
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
