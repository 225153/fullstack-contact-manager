import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User as UserService } from '../../services/user';
import { Contact as ContactService } from '../../services/contact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout.html',
  styleUrl: './ajout.css',
})
export class Ajout {

  contactForm: FormGroup;
  image: any;

  constructor( 
    private fb: FormBuilder, 
    private _user: UserService, 
    private _contact: ContactService,
    private _router: Router  
  ){

    let controls = {
      name: new FormControl('', [ Validators.required ]),
      lastname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    }

    this.contactForm = this.fb.group(controls);

  }

  selectImage(e: any){
    this.image = e.target.files[0];
  }

  send(){
    let idUser = this._user.getUserData().id;

    let fd = new FormData();
    fd.append( 'name', this.contactForm.value.name );
    fd.append( 'lastname', this.contactForm.value.lastname );
    fd.append( 'email', this.contactForm.value.email );
    fd.append( 'adress', this.contactForm.value.address );
    fd.append( 'phone', this.contactForm.value.tel );
    fd.append( 'image',  this.image );
    fd.append( 'idUser', idUser );
    
    this._contact.addContact( fd ).subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Contact added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        
        this._router.navigate(['/home/list']); 
        
      },  
      error: (err)=>{
        console.log(err);
        
        // Check if it's a duplicate key error
        if (err.error?.err?.includes('E11000 duplicate key')) {
          let field = 'email or phone';
          if (err.error.err.includes('email')) {
            field = 'email';
          } else if (err.error.err.includes('phone')) {
            field = 'phone';
          }
          
          Swal.fire({
            icon: 'error',
            title: 'Duplicate Contact',
            text: `A contact with this ${field} already exists in your contact list.`,
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.msg || 'Failed to add contact. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      }
    })

    
  }
}
