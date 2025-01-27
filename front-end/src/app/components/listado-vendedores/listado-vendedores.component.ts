import { Component } from '@angular/core';
import { BonosService } from '../../bonos.service';

@Component({
  selector: 'app-listado-vendedores',
  standalone: false,
  
  templateUrl: './listado-vendedores.component.html',
  styleUrl: './listado-vendedores.component.css'
})
export class ListadoVendedoresComponent {

  vendedores: any[] = [];


  constructor(private bonosService: BonosService) {}

  ngOnInit(): void {
    this.bonosService.getVendedores().subscribe({
      next: (data) => (this.vendedores = data),
      error: (err) => console.error('Error al obtener los vendedores:', err),
    });


  }

}
