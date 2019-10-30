import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {
    AgmCoreModule
} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TenderModalComponent} from './modal/tender-modal/tender-modal.component';
import {TenderService} from './service/tender.service';
import {HttpClientModule} from '@angular/common/http';
import {TenderitemService} from './service/tenderitem.service';

import {TrenchModalComponent} from './modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from './modal/crew-modal/crew-modal.component';
import { OrganizationModalComponent } from './modal/organization-modal/organization-modal.component';
import { OrganizationComponent } from './organization/organization.component';

import { UserComponent } from './user/user.component';
import { UserModalComponent } from './modal/user-modal/user-modal.component';

import { CreateTenderItemComponent } from './create-tender-item/create-tender-item.component';
import { AutoAdjustDirective } from './directive/auto-adjust.directive';
import {OrganizationService} from './service/organization.service';
import { NotifySubcontractorComponent } from './modal/notify-subcontractor/notify-subcontractor.component';
import { CrewComponent } from './crew/crew.component';
import {CrewItemService} from './service/crew-item.service';
import {CrewService} from './service/crew.service';
import { CreateCrewComponent } from './create-crew/create-crew.component';
import { DateConverterPipe } from './pipe/date-converter.pipe';

import {SpeechRecognitionService} from './service/speech-recognition.service';
import { AnalyticsComponent } from './analytics/analytics.component';
<<<<<<< HEAD
import { MedicalComprehendComponent } from './medical-comprehend/medical-comprehend.component';
import {SearchSubscriberService} from './service/search-subscriber.service';
=======
import {UserServiceService} from "./services/user-service.service";
>>>>>>> 3f5c3c5ef2ee79b57e411436f5f941dec2d70942
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        NgbModule,

        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        SignupComponent,
        TenderModalComponent,
        TrenchModalComponent,
        CrewModalComponent,
        OrganizationModalComponent,
        UserModalComponent
        , NotifySubcontractorComponent],

    providers: [TenderService, TenderitemService, OrganizationService, CrewItemService, CrewService, SpeechRecognitionService, SearchSubscriberService, OrganizationService],


    bootstrap: [AppComponent],
    entryComponents: [TenderModalComponent,
        TrenchModalComponent,
        CrewModalComponent, OrganizationModalComponent,
        UserModalComponent,
        NotifySubcontractorComponent]
})
export class AppModule {
}
