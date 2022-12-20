import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from 'app/models/user.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificacionService } from './notificacion.service';
import { tryCatch } from 'rxjs/internal-compatibility';
const helper = new JwtHelperService();
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedId = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private _notificacion:NotificacionService) {
    this.checkToken();
  }

  get isLogget(): Observable<boolean> {
    return this.loggedId.asObservable();
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.api_URL}/auth`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.guardarCredenciales(res);
          this.loggedId.next(true);
          return res;
          
        }),
        catchError((err) => this.error(err))
      );
  }
  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.loggedId.next(false);
   
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut() : this.loggedId.next(true);
    
  }
  private guardarCredenciales(res: UserResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', String(res.userId));
    localStorage.setItem('rol', String(res.role));
    localStorage.setItem('usuario', String(res.usuario));
  }
  private error(err:any): Observable<never> {

      this._notificacion.showNotification("Usuario o contraseña incorrecta", "danger");
   return;      
   

  }


}
