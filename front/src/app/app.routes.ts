import { Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';

export const routes: Routes = [
  { path: 'preguntas', component: PreguntasComponent },
  //{ path: 'resultados', loadComponent: () => import('./resultados/resultados.component').then(m => m.ResultadosComponent) },
  { path: '', redirectTo: 'preguntas', pathMatch: 'full' },
];
