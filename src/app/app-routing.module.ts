import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SmartTableComponent } from './smart-table/smart-table.component';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { WrongPageComponent } from './wrong-page/wrong-page.component';
import { UpdateFormComponent } from './update-form/update-form.component'; 
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login-guard.service'; 


const routes: Routes=[
  { path: '', redirectTo:'smartTable', pathMatch:'full' },
  { path: 'smartTable', component: SmartTableComponent, canActivate:[LoginGuardService] },
  { path: 'smartTable/:delete', redirectTo:'smartTable', canActivate:[LoginGuardService] },
  { path: 'agGridTable', component: AgGridTableComponent, canActivate:[LoginGuardService]},
  { path: 'adminForm', component: AdminFormComponent, canActivate:[LoginGuardService] },
  { path: 'wrongPage', component: WrongPageComponent },
  { path: 'updateForm', component: UpdateFormComponent, canActivate:[LoginGuardService] },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule { }
