import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ListComponent } from './components/list/list.component';
import { DownloadComponent } from './components/download/download.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'listados', component: ListComponent },
  { path: 'bajar', component: DownloadComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
