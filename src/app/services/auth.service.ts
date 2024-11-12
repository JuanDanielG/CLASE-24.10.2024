import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';

interface token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.api}/auth/login`;
  protected readonly localStorage = localStorage;
  constructor(private _http: HttpClient) { }
  private _url = environment.api;

  getToken(username: string, password: string):Observable<any> {
    return this._http.post(`${this._url}/auth/login`, {
      email: username,
      password: password
    })
  }

  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }
}
