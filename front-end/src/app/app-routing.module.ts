import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MenuComponent } from './components/menu/menu.component';
import { CargaBonosComponent } from './components/carga-bonos/carga-bonos.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { CargaBonoCanceladoComponent } from './components/carga-bono-cancelado/carga-bono-cancelado.component';
import { HabilitarBonoComponent } from './components/habilitar-bono/habilitar-bono.component';
import { BonoNoParticipaComponent } from './components/bono-no-participa/bono-no-participa.component';
import { TestComponent } from './components/test/test.component';
import { ListadosBonosCargadosComponent } from './components/listados-bonos-cargados/listados-bonos-cargados.component';
import { ListadosBonosJugarComponent } from './components/listados-bonos-jugar/listados-bonos-jugar.component';
import { ListadoVendedoresComponent } from './components/listado-vendedores/listado-vendedores.component';
import { DescargarDatosCargadosComponent } from './components/descargar-datos-cargados/descargar-datos-cargados.component';
import { DescargarBonosJugarComponent } from './components/descargar-bonos-jugar/descargar-bonos-jugar.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cargar', component: CargarComponent },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'carga-bonos', component: CargaBonosComponent },
  { path: 'carga-bono-cancelado', component: CargaBonoCanceladoComponent },
  { path: 'habilitar-bono', component: HabilitarBonoComponent },
  { path: 'bono-no-participa', component: BonoNoParticipaComponent },
  { path: 'test', component: TestComponent },
  { path: 'listados-bonos-cargados', component: ListadosBonosCargadosComponent },
  { path: 'listados-bonos-jugar', component: ListadosBonosJugarComponent },
  { path: 'listado-vendedores', component: ListadoVendedoresComponent },
  { path: 'descargar-datos-cargados', component: DescargarDatosCargadosComponent },
  { path: 'descargar-bonos-jugar', component: DescargarBonosJugarComponent },
  { path: '', redirectTo: '/cargar', pathMatch: 'full' },
  { path: '**', redirectTo: '/cargar' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
