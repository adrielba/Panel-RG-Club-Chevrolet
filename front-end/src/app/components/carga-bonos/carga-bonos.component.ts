import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carga-bonos',
  standalone: false,
  
  templateUrl: './carga-bonos.component.html',
  styleUrl: './carga-bonos.component.css'
})
export class CargaBonosComponent {
    numero: number | null = null;
    error: string | null = null;
    error1: string | null = null;
    number: number | null = null;
    bono: any = null;
    mostrarOverlay: boolean = false;
  
  
  constructor(private http: HttpClient) {}
  
  verificarNumero(){
    if(this.number === null || this.number < 0 || this.number > 2499){
      this.error1 = 'Número fuera de rango';
      return;
    }
  
    this.error1 = null;
  
    this.http.post('https://rg-chivoclub.online/back-end/index.php?action=verificarNumero', { number: this.number }).subscribe(
      (response: any) => {
        this.bono = response;
        this.mostrarOverlay = true;
      }, (error) => {
        if(error.status === 400){
          alert('Bono no disponible. El número ya fue vendido');
        } else{
          alert('Ocurrio un error en el Servidor');
        }
      }
    );
  }
  
  cargarBono() {
    if (!this.bono || !this.bono.vende || !this.bono.numeros) {
        console.error("Datos incompletos para cargar el bono");
        return;
    }
  
    const [n1] = this.bono.numeros.split(' * ').map(Number);
  
    const bonoData = {
        nombre: this.bono.nombre || null,
        domicilio: this.bono.domicilio || null,
        dni: this.bono.dni || null,
        fono: this.bono.fono || null,
        number: n1,
        vende: this.bono.vende || null
    };
  
    this.http.post('https://rg-chivoclub.online/back-end/index.php?action=cargarBono', bonoData, {
        headers: { 'Content-Type': 'application/json' }
    }).subscribe(
        response => {
            console.log('Bono cargado:', response);
            alert('Bono Cargado con Exito!');
            this.exitOverlay();
        },
        error => {
            console.error('Error al cargar el bono:', error);
        }
    );
  }
  
  exitOverlay(){
    this.mostrarOverlay = false;
    this.bono = null;
  }


}
