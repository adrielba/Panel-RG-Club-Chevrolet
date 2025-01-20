import { Component } from '@angular/core';
import { DownloadService } from '../../download.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download',
  standalone: false,
  
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {

  private apiUrl = 'https://rg-chivoclub.online/back-end/index.php?action=bajarCargada7';

  constructor(private downloadService: DownloadService, private http: HttpClient) {}

  generarArchivo(): void {
    this.downloadService.generarArchivo().subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (err) => {
        console.error('Error al generar el archivo:', err);
      },
    });
  }

  descargarArchivo(): void {
    this.downloadService.descargarArchivo();
  }

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
