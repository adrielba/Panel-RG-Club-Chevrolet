import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    {
      title: 'Carga',
      links: [
        { label: 'Carga de Bonos', route: '/carga-bonos' },
        { label: 'Carga de Bono Cancelado', route: '/carga-bono-cancelado' },
        { label: 'Habilitar El Bono para Cargar Datos', route: '/habilitar-bono' },
        { label: 'Bono NO PARTICIPA', route: '/bono-no-participa' }
      ]
    },
    {
      title: 'Estadísticas',
      links: [
        { label: 'Estadística Bono Contribución', route: '/estadisticas' }
      ]
    },
    {
      title: 'Listados',
      links: [
        { label: 'Listado de Bonos Cargados', route: '/listados-bonos-cargados' },
        { label: 'Listados de Bonos Aptos Para Jugar', route: '/listados-bonos-jugar' },
        { label: 'Listado de Vendedores', route: '/listado-vendedores' }
      ]
    },
    {
      title: 'Descargar',
      links: [
        { label: 'Bajar Archivos con Datos Cargados', route: '/descargar-datos-cargados' },
        { label: 'Bajar Archivo Bonos Aptos para Jugar', route: '/descargar-bonos-jugar' }
      ]
    }
  ];
}
