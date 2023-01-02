import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actas, ReporteActas } from "app/models/actas.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActasService {
  constructor(private http: HttpClient) {}
  getActas(): Observable<Actas[]> { 
    let options = this.createRequestOptions();
    return this.http.get<Actas[]>(`${environment.api_URL}/actas`, {
      headers: options,
    });
  }
  getActasReportes(): Observable<ReporteActas[]> {
    let options = this.createRequestOptions();
    return this.http.get<ReporteActas[]>(`${environment.api_URL}/actas/reporteActas`, {
      headers: options,
    });
  }
  saveActa(placa: any): any {
    let options = this.createRequestOptions();
    return this.http.post<Actas>(`${environment.api_URL}/actas`, placa, {
      headers: options,
    });
  }
  deleteActa(id: number): any {
    let options = this.createRequestOptions();
    return this.http.delete<Actas>(`${environment.api_URL}/actas/${id}`, {
      headers: options,
    });
  }
  editActa(id: number, acta: any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/actas/${id}`, acta, {
      headers: options,
    });
  }
  buscarActa(busqueda: string): any {
    let options = this.createRequestOptions();
    const enviar = {
      busqueda: busqueda,
    };
    return this.http.post<Actas[]>(
      `${environment.api_URL}/actas/buscarActa`,
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
