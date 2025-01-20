import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private apiUrl = 'https://rg-chivoclub.online/back-end/index.php';

  constructor(private http: HttpClient) {}

  generarArchivo(): Observable<any> {
    return this.http.get(`${this.apiUrl}?action=generarArchivo`);
  }

  descargarArchivo(): void {
    const downloadUrl = `${this.apiUrl}?action=descargarArchivo`;
    window.open(downloadUrl, '_blank');
  }
}
