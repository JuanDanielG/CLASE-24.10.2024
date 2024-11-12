import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let a = req;
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    if (localStorage.getItem("token")) {
      a = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }
  }
  return next(a).pipe(catchError(errores));
};

function errores(error: HttpErrorResponse) {
  console.error(error);
  return throwError(() => Error('Something bad happened; please try again'));
}
