import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanActivate {
  constructor(private authService: AuthService,  private router:Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogget.pipe(
      take(1),
      map((isLogget:boolean) =>  {
        if(isLogget) {
          return isLogget  
        }else{
         this.router.navigate(['/login'])
          return isLogget;
        }
      })
    )

  }
  
}
