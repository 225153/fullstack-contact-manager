import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { User } from '../services/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  RegisterForm: FormGroup;

  constructor(private fb: FormBuilder,private userService: User, private router: Router) {
    
    let controls = {
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/),Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/),Validators.maxLength(20)]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/),Validators.maxLength(20)]),
    };
    this.RegisterForm = this.fb.group(controls);
    };




  send(){
    this.userService.register(this.RegisterForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error.message || 'An error occurred during registration. Please try again.',
        });
      }
    });

  }
}
