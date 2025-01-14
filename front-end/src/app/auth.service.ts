import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(usuario: string, contraseña: string): Observable<any>{
    const url = `https://rg-chivoclub.online/back-end/index.php?action=login`;
    return this.http.post(url, { usuario, contraseña }, ).pipe(
      tap((response: any) => {
        if(response.token){
          const expirationDate = new Date().getTime() + 8 * 60 * 60 * 1000;
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('token_expiracy', expirationDate.toString());
        }
      })
    );
  }

  logout(){
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const expiry = localStorage.getItem('token_expiry');
    if (!token || !expiry) return false;

    const expiryDate = parseInt(expiry, 10);
    if (new Date().getTime() > expiryDate) {
      this.logout();
      return false;
    }
    return true;
  }
}
