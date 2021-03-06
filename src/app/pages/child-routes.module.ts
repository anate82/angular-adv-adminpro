import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent,data:{titulo:'Ajustes'} },
            { path: 'buscar/:termino', component: BusquedaComponent,data:{titulo:'Busquedas'} },
            { path: 'grafica1', component: Grafica1Component,data:{titulo:'Grafica'} },
            { path: 'progress', component: ProgressComponent,data:{titulo:'ProgressBar'} },
            { path: 'promeses', component: PromisesComponent,data:{titulo:'Promesas'} },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

            //Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Medicos' } },
            //Rutas de Admin
            { path: 'usuarios', canActivate:[AdminGuard],component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
];
@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
