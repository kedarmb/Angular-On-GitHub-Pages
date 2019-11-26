import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import {MatBadgeModule, MatIconModule} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
    AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule
} from '@angular/material';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TenderService } from './service/tender.service';
import { HttpClientModule } from '@angular/common/http';
import { TenderitemService } from './service/tenderitem.service';
import { OrganizationService } from './service/organization.service';
import { CrewItemService } from './service/crew-item.service';
import { CrewService } from './service/crew.service';
import { SpeechRecognitionService } from './service/speech-recognition.service';
import { SearchSubscriberService } from './service/search-subscriber.service';
import { EquipmentsService } from './service/equipments.service';
import { LabourService } from './service/labour.service';
import { TenderModalComponent } from './shared/components/tender-modal/tender-modal.component';
import { TrenchModalComponent } from './shared/components/trench-modal/trench-modal.component';
import { CrewModalComponent } from './shared/components/crew-modal/crew-modal.component';
import { OrganizationModalComponent } from './shared/components/organization-modal/organization-modal.component';
import { EquipmentsModalComponent } from './shared/components/equipments-modal/equipments-modal.component';
import { UserModalComponent } from './shared/components/user-modal/user-modal.component';
import { NotifySubcontractorComponent } from './shared/components/notify-subcontractor/notify-subcontractor.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        NgbModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],

    providers: [TenderService, 
        TenderitemService,
        OrganizationService,
        CrewItemService, 
        CrewService,
        SpeechRecognitionService,
        SearchSubscriberService, 
        OrganizationService, 
        EquipmentsService, 
        LabourService],


    bootstrap: [AppComponent],
    
})
export class AppModule {
}
