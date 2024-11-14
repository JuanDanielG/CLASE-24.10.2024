import { inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import {of} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => { //PARA PROTEGER LAS RUTAS

  let a = localStorage.getItem("token");
  const router =inject(Router);

  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const token = localStorage.getItem("token");

    if (!token) {
      router.navigateByUrl('administrador/usuario').then();
      return of(false);
    }

    return of(true);
  } else {
    router.navigateByUrl('administrador/producto').then();
    return of(false);
  }
};
