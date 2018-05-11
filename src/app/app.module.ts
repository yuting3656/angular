import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng2SmartTableModule } from 'ng2-smart-table'; // smart table 用

import { HttpSpaceMeService } from './http-space-me.service';
import { LoginService } from './login.service';
import { LoginGuardService } from './login-guard.service';

import { AppComponent } from './app.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { AccountPagerPipe } from './account-pager.pipe';
import { QueryFormComponent } from './query-form/query-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { MyHttpInterceptor } from './my-http-interceptor';
import { WrongPageComponent } from './wrong-page/wrong-page.component';
import { ButtonRenderComponent } from './button-render/button-render.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminFormComponent,
    SmartTableComponent,
    AccountPagerPipe,
    QueryFormComponent,
    DashboardComponent,
    AgGridTableComponent,
    WrongPageComponent,
    ButtonRenderComponent,
    UpdateFormComponent,
    LoginComponent,
    LogoutComponent,
    NavBarComponent,
  ],
  entryComponents:[
    ButtonRenderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    HttpSpaceMeService,
    LoginService,
    LoginGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
