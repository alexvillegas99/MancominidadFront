import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Placa } from "app/models/placa.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlacaService {
  constructor(private http: HttpClient) {}
  getPlacas(): Observable<Placa[]> {
    let options = this.createRequestOptions();
    return this.http.get<Placa[]>(`${environment.api_URL}/placa`, {
      headers: options,
    });
  }
  getPlaca(placa: string) {
    let options = this.createRequestOptions();
    return this.http.get<Placa>(`${environment.api_URL}/placa/${placa}`, {
      headers: options,
    });
  }
  savePlaca(placa: Placa): any {
    let options = this.createRequestOptions();
    return this.http.post<Placa>(`${environment.api_URL}/placa`, placa, {
      headers: options,
    });
  }
  deletePlaca(id: number): any {
    let options = this.createRequestOptions();
    return this.http.delete<Placa>(`${environment.api_URL}/placa/${id}`, {
      headers: options,
    });
  }
  editPlaca(id: number, placa: any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/placa/${id}`, placa, {
      headers: options,
    });
  }
  buscarPlaca(busqueda: string): any {
    let options = this.createRequestOptions();
    const enviar = {
      busqueda: busqueda,
    };
    return this.http.post<Placa[]>(
      `${environment.api_URL}/placa/buscarPlaca`,
      enviar,
      { headers: options }
    );
  }
  buscarPlacaConsulta(busqueda: any){
    return this.http.post<Placa[]>(
      `${environment.api_URL}/placa/buscarPlacaConsulta`,
      busqueda
    );
  }
  private createRequestOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      auth: token,
    });
    return headers;
  }

}
