import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CheckLoginGuard } from './services/guards/check-login.guard';
import { LogOutGuard } from './services/guards/log-out.guard';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: 'consulta',
    component: ConsultaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[LogOutGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  },
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
