import { AuthorizationRoutingModule } from './authorization.routes';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule , MatCardModule,MatToolbarModule} from '@angular/material';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AuthorizationRoutingModule,
                MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCardModule,
        MatToolbarModule,
    ],
    exports: [],
    providers: [],
})
export class AuthorizationModule { }
