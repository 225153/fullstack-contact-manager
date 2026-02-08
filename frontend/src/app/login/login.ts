import { Component, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  private platformId = inject(PLATFORM_ID);

  constructor(fb:FormBuilder,private user: User, private router: Router) {
    let controls = {
      email : new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/) ])
    }

    this.loginForm = fb.group(controls);

  }

  send(){
    this.user.login(this.loginForm.value).subscribe({
      next:(res: any)=>{
        // Save token to localStorage (only in browser)
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: res.msg,
          timer: 2000,
          showConfirmButton: false
        });
        
        // Navigate to home or dashboard
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.msg || 'Invalid credentials',
        });
        console.log(err);
      }
    });
  }
  register(){
    this.router.navigate(['/register']);
  }

}
