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
import { SharedModule } from 'app/shared/shared.module';
import { EntryComponent } from './entry/entry.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        EntryComponent,
    ],
    imports: [
        SharedModule,
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
