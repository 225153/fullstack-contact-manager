import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  url='http://localhost:3000/contact';
  constructor(private http: HttpClient) {}

  addContact(data:any){
    return this.http.post(`${this.url}/addcontact`,data);
  }
  getcontactuser(id:any){
    return this.http.get(`${this.url}/getcontactsuser/${id}`);
  }
   getcontact(id:any){
    return this.http.get(`${this.url}/getcontact/${id}`);
  }
  updatecontact(id:any,data:any){
    return this.http.put(`${this.url}/updatecontact/${id}`,data);
  }
  deletecontact(id:any){
    return this.http.delete(`${this.url}/deletecontact/${id}`);
  }


  
}
