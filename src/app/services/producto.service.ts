import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {environment} from '../environment/environment';
import {Observable} from 'rxjs';
import {ProductoInterface} from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly _http = inject(HttpClient);
  private _url = environment.api;

  constructor() {
  }

  getAllProduct(): Observable<ProductoInterface[]> {
    return this._http.get<ProductoInterface[]>(`${this._url}/products`)
  }

  getProductById(id: number): Observable<any> {
    return this._http.get<ProductoInterface>(`${this._url}/products/${id}`);
  }

  searchProductsByName(name: string): Observable<ProductoInterface[]> {
    return this._http.get<ProductoInterface[]>(`${this._url}/products/?title=${name}`);
  }

  addProducto(product: any): Observable<any> {
    return this._http.post<any>(`${this._url}/products/`, product);
  }

  updateProducto(id: number, product: any): Observable<any> {
    return this._http.put<ProductoInterface[]>(`${this._url}/products/${id}`, product);
  }

  deleteProducto(id: number): Observable<any> {
    return this._http.delete<ProductoInterface[]>(`${this._url}/products/${id}`);
  }
}
