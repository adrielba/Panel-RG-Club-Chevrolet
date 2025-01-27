import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carga-bono-cancelado',
  standalone: false,
  
  templateUrl: './carga-bono-cancelado.component.html',
  styleUrl: './carga-bono-cancelado.component.css'
})
export class CargaBonoCanceladoComponent {
    numero: number | null = null;
    error: string | null = null;
    numeroCancelado: number | null = null;
    mensaje: string | null = null;
  
  
  
  constructor(private http: HttpClient) {}

    cargarBonoCancelado(): void {
      if (this.numeroCancelado === null || this.numeroCancelado <= 0) {
        this.mensaje = "Por favor, ingrese un número válido.";
        return;
      }
  
      const payload = { numero: this.numeroCancelado };
  
      this.http.post('https://rg-chivoclub.online/back-end/index.php?action=bonoCancelado', payload)
        .subscribe({
          next: (response: any) => {
            this.mensaje = response.message;
          },
          error: (error) => {
            this.mensaje = error.error?.error || "Error al procesar la solicitud.";
          }
        });
    }

}
