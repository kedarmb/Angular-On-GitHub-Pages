import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!


import { AdminLayoutRoutes, AdminLayoutRoutesModule } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatExpansionModule
} from '@angular/material';


import {TenderComponent} from '../../tender/tender.component';
import {TenderitemComponent} from '../../tenderitem/tenderitem.component';
import { ViewTenderComponent } from './../../view-tender/view-tender.component';
import {EditInputComponent} from '../../edit-input/edit-input.component';
import {OrganizationComponent} from '../../organization/organization.component';

import { UserComponent } from '../../user/user.component';
//import { LabourComponent } from '../../components/labour/labour.component';

import {CreateTenderItemComponent} from '../../create-tender-item/create-tender-item.component';
import {AutoAdjustDirective} from '../../directive/auto-adjust.directive';
import {CrewComponent} from '../../crew/crew.component';
import {EquipmentsComponent} from '../../equipments/equipments.component';
import {LabourComponent} from '../../labour/labour.component';
import {CreateCrewComponent} from '../../create-crew/create-crew.component';
import {DateConverterPipe} from '../../pipe/date-converter.pipe';
import {PdfViewerComponent} from '../../pdf-viewer/pdf-viewer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

//  import {QuoteComponent} from '../../components/quote/quote.component';
 import {ChartsModule} from 'ng2-charts';

 import{CalculationComponent} from  '../../components/calculation/calculation.component';
 import{SettingsComponent} from '../../components/settings/settings.component';
import {AnalyticsComponent} from '../../analytics/analytics.component';
import {MedicalComprehendComponent} from '../../medical-comprehend/medical-comprehend.component';
 import{FullcalenderComponent} from '../../components/fullcalender/fullcalender.component';


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
  
    PdfViewerModule,
    FileUploadModule,
     ChartsModule,
     FullCalendarModule,
   
   
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
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
  // QuoteComponent,
    PdfViewerComponent,
    CalculationComponent,
    SettingsComponent
   
    
  ]
})

export class AdminLayoutModule {}
