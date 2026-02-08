import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  user1:any;

  constructor(private user: User,private router: Router) {}
  ngOnInit(): void {
    console.log("home component loaded");
    this.user1 = this.user.getUserData();
    console.log('User data:', this.user1);
  }

  logout(){
    this.user.logout();
    this.router.navigate(['/login']);

  }



}
