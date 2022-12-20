import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';/* 
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RecaudacionComponent } from './recaudacion/recaudacion.component';
import { CuadreCajaComponent } from './cuadre-caja/cuadre-caja.component';
import { ComprasComponent } from './compras/compras.component';
import { FacturasComponent } from './facturas/facturas.component'; */
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';

registerLocaleData(localeEs,'es');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ConsultaComponent,
  ],
  providers: [{provide:LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
