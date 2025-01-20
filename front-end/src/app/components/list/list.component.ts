import { Component, OnInit } from '@angular/core';
import { BonosService } from '../../bonos.service';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  bonos: any[] = [];
  bonosAptos: any[] = [];
  noEntregados: any[] = [];
  vendedores: any[] = [];


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

    this.bonosService.getAptosParaJugar().subscribe({
      next: (data) => {
        this.bonosAptos = data;
      },
      error: (err) => {
        console.error('Error al obtener los bonos aptos para jugar:', err);
      },
    });

    this.bonosService.getVendedores().subscribe({
      next: (data) => (this.vendedores = data),
      error: (err) => console.error('Error al obtener los vendedores:', err),
    });


  }
}
