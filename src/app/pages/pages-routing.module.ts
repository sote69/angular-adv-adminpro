import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo : 'Dashboard'} },
      { path: 'grafica1', component: Grafica1Component , data: {titulo : 'Grafica #1'} },
      { path: 'progress', component: ProgressComponent , data: {titulo : 'Progess Bar'} },
      { path: 'account-settings', component: AccountSettingsComponent , data: {titulo : 'Ajustes'} },
      { path: 'perfil', component: PerfilComponent , data: {titulo : 'Perfil de usuario'} },
      { path: 'promesas', component: PromesasComponent , data: {titulo : 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent , data: {titulo : 'Rxjs'} },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent , data: {titulo : 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent , data: {titulo : 'Médicos'} },
      { path: 'usuarios', component: UsuariosComponent , data: {titulo : 'Usuarios'} },
    ]
  },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
