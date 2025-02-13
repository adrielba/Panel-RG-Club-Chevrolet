import { Component } from '@angular/core';
import { BonosService } from '../../bonos.service';

@Component({
  selector: 'app-listados-bonos-jugar',
  standalone: false,

  templateUrl: './listados-bonos-jugar.component.html',
  styleUrl: './listados-bonos-jugar.component.css',
})
export class ListadosBonosJugarComponent {
  bonosAptos: any[] = [];

  constructor(private bonosService: BonosService) {}

  ngOnInit(): void {
    this.bonosService.getAptosParaJugar().subscribe({
      next: (data) => {
        this.bonosAptos = data;
      },
      error: (err) => {
        console.error('Error al obtener los bonos aptos para jugar:', err);
      },
    });
  }
}
