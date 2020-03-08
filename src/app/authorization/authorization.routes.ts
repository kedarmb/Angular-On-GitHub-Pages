
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const LoginRoutes = [
         { path: '', redirectTo: 'login', pathMatch: 'full' },
        //  { path: 'login', component: LoginComponent },
         { path: 'login', component: SignupComponent }
       ];

@NgModule({
    imports: [RouterModule.forChild(LoginRoutes)],
    exports: [RouterModule]
})

export class AuthorizationRoutingModule { }
