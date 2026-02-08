import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class User {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private http: HttpClient) {}
  url='http://localhost:3000/user';
  
  login(data:any){
    return this.http.post(`${this.url}/signin`,data);
  }
  
  register(data:any){
    return this.http.post(`${this.url}/signup`,data);
  }
  
  logout(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
  
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = token.split('.')[1];
          const decoded = JSON.parse(atob(payload));
          return decoded;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
    }
    return null;
  }
  
}
