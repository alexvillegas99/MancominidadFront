import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    usuario: ['' ,[Validators.required, Validators.minLength(6)]],
    clave: ['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
    private router:Router
  ) {
    
  }

  ngOnInit(): void {
  
  }
  onLogin(){
    const formValue= this.loginForm.value;
    this.authService.login(formValue).subscribe(res=>{
      this.router.navigate(['/dashboard']);
    
    });
  }
 

}
