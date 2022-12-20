import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'app/models/roles.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private http: HttpClient) { 
  }
  getRoles(): Observable<Roles[]>{
    let options = this.createRequestOptions();
    return this.http.get<Roles[]>(`${environment.api_URL}/rol`,{ headers: options });

  }
  getRol(id: string) {
    return this.http.get<Roles>(`${environment.api_URL}/rol/${id}`);
  }
  saveRol(rol:Roles): any{
    let options = this.createRequestOptions();
     return this.http.post<Roles>(`${environment.api_URL}/rol`,rol,{ headers: options });
     
  }
  editRol(id:number,rol:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/rol/${id}`, rol,{ headers: options });
  }
  deleteRol(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<Roles>(`${environment.api_URL}/rol/${id}`,{ headers: options });
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
