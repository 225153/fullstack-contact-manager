import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(User);
  const router = inject(Router); 
  
  if(user.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};

