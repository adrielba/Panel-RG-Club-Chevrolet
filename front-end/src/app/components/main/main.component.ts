import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: false,
  
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  numero: number | null = null;
  ganador: any = null;
  error: string | null = null;

constructor(private http: HttpClient) {}

verGanador() {
    if (this.numero === null || this.numero === undefined) {
      this.error = 'Por favor, ingresa un número válido';
      return;
    }

    this.error = null;

    this.http
      .post('http://localhost/chivoback/index.php?action=verGanador', { numero: this.numero })
      .subscribe(
        (response: any) => {
          this.ganador = response;
        },
        (error) => {
          if (error.status === 404) {
            this.error = 'Bono no Vendido';
          } else {
            this.error = 'Ocurrió un error en el servidor';
          }
        }
      );
}

  cerrarOverlay() {
    this.ganador = null;
  }
}

