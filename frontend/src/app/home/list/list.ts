import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { Contact } from '../../services/contact';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  contacts:any;
  constructor(private user: User,private contact: Contact) {}
 ngOnInit(){
    const userData = this.user.getUserData();
    console.log(userData);
    if (userData && userData.id) {
      const Userid = userData.id;
      this.contact.getcontactuser(Userid).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.contacts = res.contacts;
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  delete(stringId: string){
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contact.deletecontact(stringId).subscribe({
        next:(res)=>{
          console.log(res);
          this.contacts = this.contacts.filter((c:any) => c._id !== stringId);
          Swal.fire({
            icon: 'success',
            title: 'Contact deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error:(err)=>{
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete contact',
            text: 'An error occurred while deleting the contact. Please try again.',
          });
        }
      });
    }
  }
}
    
  



