import { Component } from '@angular/core';
import { BonosService } from '../../bonos.service';

@Component({
  selector: 'app-listados-bonos-cargados',
  standalone: false,
  
  templateUrl: './listados-bonos-cargados.component.html',
  styleUrl: './listados-bonos-cargados.component.css'
})
export class ListadosBonosCargadosComponent {
  bonos: any[] = [];


  constructor(private bonosService: BonosService) {}

  ngOnInit(): void {
    this.bonosService.getBonosCargados().subscribe({
      next: (data) => {
        this.bonos = data;
      },
      error: (err) => {
        console.error('Error al obtener los bonos cargados:', err);
      },
    });
  }

}
