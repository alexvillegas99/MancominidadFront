import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoVehiculo } from 'app/models/tipo_vehiculo.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private http: HttpClient) { 
   
  }
  getTipoVehiculo(): Observable<TipoVehiculo[]>{
    let options = this.createRequestOptions();
    return this.http.get<TipoVehiculo[]>(`${environment.api_URL}/tipo_vehiculo`,{ headers: options });

  }
 private createRequestOptions() {
  let token = localStorage.getItem('token');
  let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "auth": token
  });
  return headers;
}
}
