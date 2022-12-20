import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LbdModule } from "../../lbd/lbd.module";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { HomeComponent } from "../../home/home.component";
import { ReportesComponent } from "../../reportes/reportes.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsuariosComponent } from "app/usuarios/usuarios.component";
import { PlacasComponent } from "app/placas/placas.component";
import { UserComponent } from "app/user/user.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NgbModule,
  ],
  declarations: [
    HomeComponent,
    ReportesComponent,
    UsuariosComponent,
    PlacasComponent,
    UserComponent
  ],
})
export class AdminLayoutModule {}
