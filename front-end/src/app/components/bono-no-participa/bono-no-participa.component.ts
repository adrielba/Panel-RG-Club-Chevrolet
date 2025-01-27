import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bono-no-participa',
  standalone: false,
  
  templateUrl: './bono-no-participa.component.html',
  styleUrl: './bono-no-participa.component.css'
})
export class BonoNoParticipaComponent {

    number: number | null = null;
  
    numeroNoParticipa: number = 0;
  
  
  constructor(private http: HttpClient) {}
  
    marcarNoParticipa() {
      if (this.numeroNoParticipa <= 0) {
        alert('Por favor, ingrese un número válido.');
        return;
      }
  
      const payload = { numero: this.numeroNoParticipa };
      this.http
        .post('https://rg-chivoclub.online/back-end/index.php?action=bonoNoParticipa', payload)
        .subscribe(
          (response: any) => {
            alert(response.message || 'Bono marcado como NO PARTICIPA.');
          },
          (error) => {
            alert(error.error?.error || 'Hubo un error al marcar el bono.');
          }
        );
    }

}
