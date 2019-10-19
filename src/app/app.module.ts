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
import {TenderItemModalComponent} from './modal/tender-item-modal/tender-item-modal.component';
import {TenderSubitemModalComponent} from './modal/tender-subitem-modal/tender-subitem-modal.component';
import {TrenchModalComponent} from './modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from './modal/crew-modal/crew-modal.component';
import { OrganizationModalComponent } from './modal/organization-modal/organization-modal.component';
import { OrganizationComponent } from './organization/organization.component';
import { CreateTenderItemComponent } from './create-tender-item/create-tender-item.component';
import { AutoAdjustDirective } from './directive/auto-adjust.directive';
import {OrganizationService} from './service/organization.service';
import { NotifySubcontractorComponent } from './modal/notify-subcontractor/notify-subcontractor.component';
import { CrewComponent } from './crew/crew.component';
import {CrewItemService} from './service/crew-item.service';
import {CrewService} from './service/crew.service';




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
        TenderItemModalComponent,
        TenderSubitemModalComponent,
        TrenchModalComponent,
        CrewModalComponent,
        OrganizationModalComponent,
        NotifySubcontractorComponent],
    providers: [TenderService, TenderitemService, OrganizationService, CrewItemService, CrewService],
    bootstrap: [AppComponent],
    entryComponents: [TenderModalComponent,
        TenderItemModalComponent,
        TenderSubitemModalComponent,
        TrenchModalComponent,
        CrewModalComponent, OrganizationModalComponent,
        NotifySubcontractorComponent]
})
export class AppModule {
}
