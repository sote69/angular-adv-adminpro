import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes :Routes = [
  { path: '', component: DashboardComponent, data: {titulo : 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent , data: {titulo : 'Ajustes'} },
      { path: 'buscar/:termino', component: BusquedasComponent , data: {titulo : 'Busquedas'} },
      { path: 'grafica1', component: Grafica1Component , data: {titulo : 'Grafica #1'} },
      { path: 'perfil', component: PerfilComponent , data: {titulo : 'Perfil de usuario'} },
      { path: 'progress', component: ProgressComponent , data: {titulo : 'Progess Bar'} },
      { path: 'promesas', component: PromesasComponent , data: {titulo : 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent , data: {titulo : 'Rxjs'} },

      // * Mantenimientos
      { path: 'hospitales', component: HospitalesComponent , data: {titulo : 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent , data: {titulo : 'Médicos'} },
      { path: 'medico/:id', component: MedicoComponent , data: {titulo : 'Médicos'} },

      // * Ruta de administrador
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent , data: {titulo : 'Usuarios'} },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
