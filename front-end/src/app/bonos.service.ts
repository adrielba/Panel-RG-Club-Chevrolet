import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonosService {

  private apiUrl = 'https://rg-chivoclub.online/back-end/index.php?action=listaCargados';
  private urlJuegan = 'https://rg-chivoclub.online/back-end/index.php?action=listaAptos';
  private urlNo = 'https://rg-chivoclub.online/back-end/index.php?action=listaNoEntregados';
  private urlVendedores = 'https://rg-chivoclub.online/back-end/index.php?action=listaVendedores';

  constructor(private http: HttpClient) {}

  getBonosCargados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAptosParaJugar(): Observable<any[]> {
    return this.http.get<any[]>(this.urlJuegan);
  }

  getNoEntregados(): Observable<any[]> {
    return this.http.get<any[]>(this.urlNo);
  }

  getVendedores(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVendedores);
  }
}
