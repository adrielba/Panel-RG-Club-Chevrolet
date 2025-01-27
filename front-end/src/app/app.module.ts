import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    StatisticsComponent,
    MenuComponent,
    CargaBonosComponent,
    CargarComponent,
    CargaBonoCanceladoComponent,
    HabilitarBonoComponent,
    BonoNoParticipaComponent,
    TestComponent,
    ListadosBonosCargadosComponent,
    ListadosBonosJugarComponent,
    ListadoVendedoresComponent,
    DescargarDatosCargadosComponent,
    DescargarBonosJugarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
