import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "app/models/usuario.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  getUsuarios(): Observable<Usuario[]> {
    let options = this.createRequestOptions();
    return this.http.get<Usuario[]>(`${environment.api_URL}/usuario`, {
      headers: options,
    });
  }
  getUsuario(id: string) {
    let options = this.createRequestOptions();
    return this.http.get<Usuario>(`${environment.api_URL}/usuario/${id}`, {
      headers: options,
    });
  }
  saveUsuario(usuario: Usuario): any {
    let options = this.createRequestOptions();
    return this.http.post<Usuario[]>(
      `${environment.api_URL}/usuarios`,
      usuario,
      { headers: options }
    );
  }
  editUsuario(id: number, usuario: any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/usuario/${id}`, usuario, {
      headers: options,
    });
  }
  deleteUsuario(id: number): any {
    let options = this.createRequestOptions();
    return this.http.delete<Usuario>(`${environment.api_URL}/usuario/${id}`, {
      headers: options,
    });
  }
  cambiarContraseña(cambio: any): any {
    let options = this.createRequestOptions();
    return this.http.post<Usuario[]>(
      `${environment.api_URL}/auth/cambioClave`,
      cambio,
      { headers: options }
    );
  }
  buscarUsuario(busqueda: string): any {
    let options = this.createRequestOptions();
    const enviar = {
      busqueda: busqueda,
    };
    return this.http.post<Usuario[]>(
      `${environment.api_URL}/usuario/buscarUsuario`,
      enviar,
      { headers: options }
    );
  }
  private createRequestOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      auth: token,
    });
    return headers;
  }
}
