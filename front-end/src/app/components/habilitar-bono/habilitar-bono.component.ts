import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-habilitar-bono',
  standalone: false,
  
  templateUrl: './habilitar-bono.component.html',
  styleUrl: './habilitar-bono.component.css'
})
export class HabilitarBonoComponent {
    number: number | null = null;
  
    numeroHabilitar: number = 0;
  
  
  
  constructor(private http: HttpClient) {}
  
  
    habilitarBono() {
      if (this.numeroHabilitar <= 0) {
        alert('Por favor, ingrese un número válido.');
        return;
      }
  
      const payload = { numero: this.numeroHabilitar };
      this.http
        .post('https://rg-chivoclub.online/back-end/index.php?action=habilitarBono', payload)
        .subscribe(
          (response: any) => {
            alert(response.message || 'Bono habilitado correctamente.');
          },
          (error) => {
            alert(error.error?.error || 'Hubo un error al habilitar el bono.');
          }
        );
    }

}
