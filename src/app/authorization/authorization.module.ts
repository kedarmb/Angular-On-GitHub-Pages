import { AuthorizationRoutingModule } from './authorization.routes';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule,
     MatSelectModule, MatTooltipModule , MatCardModule, MatToolbarModule, MatGridListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

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
        MatGridListModule,
        FlexLayoutModule,
        NgxSpinnerModule
    ],
    exports: [],
    providers: [],
})
export class AuthorizationModule { }
