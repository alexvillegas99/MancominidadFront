import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPlaca } from 'app/models/tipo_placa.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TipoPlacaService {

  
  constructor(private http: HttpClient) { 
   
  }
  getTipoPlaca(): Observable<TipoPlaca[]>{
    let options = this.createRequestOptions();
    return this.http.get<TipoPlaca[]>(`${environment.api_URL}/tipo_placa`,{ headers: options });

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
