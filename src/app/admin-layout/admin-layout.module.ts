import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!


import { AdminLayoutRoutes, AdminLayoutRoutesModule } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from '../upgrade/upgrade.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatExpansionModule,
  MatTabsModule,
  MatToolbarModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';


import { TenderComponent } from './tender/tender.component';
import { TenderitemComponent } from './tenderitem/tenderitem.component';
import { ViewTenderComponent } from './view-tender/view-tender.component';
import { EditInputComponent } from './edit-input/edit-input.component';
import { OrganizationComponent } from './organization/organization.component';

import { UserComponent } from './user/user.component';
//import { LabourComponent } from '../../components/labour/labour.component';

import { CreateTenderItemComponent } from './create-tender-item/create-tender-item.component';
import { AutoAdjustDirective } from '../shared/directive/auto-adjust.directive';
import { CrewComponent } from './crew-components/crew/crew.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { LabourComponent } from './labour/labour.component';
import { CreateCrewComponent } from './crew-components/create-crew/create-crew.component';
import { DateConverterPipe } from '../shared/pipe/date-converter.pipe';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

//  import {QuoteComponent} from '../../components/quote/quote.component';
import { ChartsModule } from 'ng2-charts';

import { AnalyticsComponent } from './analytics/analytics.component';
import { MedicalComprehendComponent } from './medical-comprehend/medical-comprehend.component';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';
import { CrewEquipmentComponent } from './crew-components/crew/crew-equipment/crew-equipment.component';
import { CrewLabourComponent } from './crew-components/crew/crew-labour/crew-labour.component';


@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModule,
    MatExpansionModule,
    SharedModule,
    PdfViewerModule,
    FileUploadModule,
    ChartsModule,
    FullCalendarModule,
    MatTabsModule,
    MatListModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    MapsComponent,
    NotificationsComponent,
    TenderComponent,
    TenderitemComponent,
    ViewTenderComponent,
    EditInputComponent,
    OrganizationComponent,
    MedicalComprehendComponent,
    UserComponent,

    CreateTenderItemComponent,
    AutoAdjustDirective,
    CrewComponent,
    EquipmentsComponent,
    LabourComponent,
    CreateCrewComponent,
    DateConverterPipe,

    PdfViewerComponent,
    AnalyticsComponent,
    FullcalenderComponent,
    PdfViewerComponent,
    CrewEquipmentComponent,
    CrewLabourComponent
  ]
})

export class AdminLayoutModule { }
