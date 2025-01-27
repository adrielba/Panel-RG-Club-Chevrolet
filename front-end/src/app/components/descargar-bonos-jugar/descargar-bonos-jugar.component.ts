import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-descargar-bonos-jugar',
  standalone: false,
  
  templateUrl: './descargar-bonos-jugar.component.html',
  styleUrl: './descargar-bonos-jugar.component.css'
})
export class DescargarBonosJugarComponent {
  private apiUrl = 'https://rg-chivoclub.online/back-end/index.php?action=bajarCargada7';
  
  constructor(private http: HttpClient) {}


  descargarCargada7(): void {
    this.http.get(this.apiUrl, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${new Date().toLocaleDateString('es-ES')}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
  }

}
