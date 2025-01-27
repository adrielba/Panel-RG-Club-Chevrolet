import { Component } from '@angular/core';
import { DownloadService } from '../../download.service';

@Component({
  selector: 'app-descargar-datos-cargados',
  standalone: false,
  
  templateUrl: './descargar-datos-cargados.component.html',
  styleUrl: './descargar-datos-cargados.component.css'
})
export class DescargarDatosCargadosComponent {

  constructor(private downloadService: DownloadService){}
  
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


}
