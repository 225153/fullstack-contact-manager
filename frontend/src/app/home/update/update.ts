import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact as ContactService } from '../../services/contact';
import { User } from '../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
   contactForm: FormGroup;
  image: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private _user: User,
    private _contact: ContactService,
    private _router: Router,
    private _act: ActivatedRoute
  ) {
    let controls = {
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    };

    this.contactForm = this.fb.group(controls);
  }

  ngOnInit(): void {
    this.id = this._act.snapshot.paramMap.get('id');

    this._contact.getcontact(this.id).subscribe({
      next: (res:any) => {
        const contactData = {
          name: res.contact.name,
          lastname: res.contact.lastname,
          email: res.contact.email,
          tel: res.contact.phone,
          address: res.contact.adress
        };
        this.contactForm.patchValue(contactData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectImage(e: any) {
    this.image = e.target.files[0];
  }

  send() {
    const userData = this._user.getUserData();
    if (!userData || !userData.id) {
      console.error('User data not found');
      return;
    }
    let idUser = userData.id;

    let fd = new FormData();
    fd.append('name', this.contactForm.value.name);
    fd.append('lastname', this.contactForm.value.lastname);
    fd.append('email', this.contactForm.value.email);
    fd.append('adress', this.contactForm.value.address);
    fd.append('phone', this.contactForm.value.tel);
    fd.append('idUser', idUser);
    if(this.image){
      fd.append('image', this.image);
    }

    this._contact.updatecontact( this.id, fd).subscribe({
      next: (res) => {
        this._router.navigate(['/home/list']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
