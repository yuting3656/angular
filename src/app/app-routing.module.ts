import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SmartTableComponent } from './smart-table/smart-table.component';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { WrongPageComponent } from './wrong-page/wrong-page.component'; 

const routes: Routes=[
  { path: '', redirectTo:'smartTable', pathMatch:'full' },
  { path: 'smartTable', component: SmartTableComponent },
  { path: 'agGridTable', component: AgGridTableComponent },
  { path: 'adminForm', component: AdminFormComponent },
  { path: 'wrongPage', component: WrongPageComponent }
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule { }
