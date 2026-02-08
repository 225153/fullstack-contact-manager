import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Notfound } from './notfound/notfound';
import { List } from './home/list/list';
import { Ajout } from './home/ajout/ajout';
import { Update } from './home/update/update';
import { authGuard } from './guards/auth-guard';



export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home',canActivate:[authGuard],component:Home,children:[
        {path:'',redirectTo:'list',pathMatch:'full'},
        {path:'list',component:List},
        {path:'ajout',component:Ajout},
        {path:'update/:id',component:Update}
        
        
    ]},
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'notfound',component:Notfound},
];
