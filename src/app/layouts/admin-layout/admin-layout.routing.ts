import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { ReportesComponent } from "app/reportes/reportes.component";
import { UsuariosComponent } from "app/usuarios/usuarios.component";
import { PlacasComponent } from 'app/placas/placas.component';
import { UserComponent } from "app/user/user.component";
export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "usuario", component: UserComponent },
  { path: "reportes", component: ReportesComponent },
  { path: "placas", component: PlacasComponent },
];
