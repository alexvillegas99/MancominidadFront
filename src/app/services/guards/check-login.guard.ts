import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogget.pipe(
      take(1),
      map((isLogget:boolean) => {
        if(isLogget) {
         this.router.navigate(['/usuarios']);
          return !isLogget
        }else{

          return !isLogget;
        }
      })
    )

  }

}
