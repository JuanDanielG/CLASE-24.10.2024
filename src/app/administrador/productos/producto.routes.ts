import { Routes } from "@angular/router";

export const routesProducto: Routes = [
    {
        path: "",
        loadComponent: () => import("./pages/productos/productos.component").then(c => c.ProductosComponent)
    },
    {
        path: ":id",
        loadComponent: () => import("./pages/productos-unico/productos-unico.component").then(c => c.ProductosUnicoComponent)
    }
];