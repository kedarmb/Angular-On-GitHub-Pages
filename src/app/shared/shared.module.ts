// import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { TenderModalComponent } from './components/tender-modal/tender-modal.component';
import { CrewModalComponent } from './components/crew-modal/crew-modal.component';
import { OrganizationModalComponent } from './components/organization-modal/organization-modal.component';
import { EquipmentsModalComponent } from './components/equipments-modal/equipments-modal.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { NotifySubcontractorComponent } from './components/notify-subcontractor/notify-subcontractor.component';
import { RouterModule } from '@angular/router';
import { TrenchModalComponent } from './components/trench-modal/trench-modal.component'
import { NgxTagsInputModule } from 'ngx-tags-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule,
  MatButtonToggleModule, MatIconModule, MatBadgeModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule,
  MatMenuModule, MatListModule, MatDividerModule, MatGridListModule, MatExpansionModule, MatTabsModule, MatStepperModule,
  MatAutocompleteModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LabourModalComponent } from './components/labour-modal/labour-modal.component';
import { MatCardModule } from '@angular/material/card';
import { EllipsisPipe } from './pipe/ellipsis.pipe';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SectionModalComponent } from './components/section-modal/section-modal.component';
import { ReverseArrayPipe } from './pipe/reverse-array.pipe';
import { LineItemCrewComponent } from './components/line-item-crew/line-item-crew.component';
import { InvitedSubcontractorsComponent } from './components/invited-subcontractors/invited-subcontractors.component';
import { ViewQuotesComponent } from './components/view-quotes/view-quotes.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';

import { ActiveTendersComponent } from './components/active-tenders/active-tenders.component';
import { OrgNamePipe } from './pipe/org-name.pipe';
import { PlaceNameFinderPipe } from './pipe/Place-Name-Finder.pipe';

const MaterialComponent = [
  NgxMatDatetimePickerModule, NgxMatTimepickerModule,
  NgxSpinnerModule,
  MatButtonModule, MatButtonToggleModule,
  MatIconModule, MatBadgeModule, MatRadioModule,
  MatProgressSpinnerModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule,
  MatListModule, MatDividerModule,
  MatGridListModule, MatExpansionModule,
  MatCardModule, MatTabsModule, MatStepperModule,
  MatFormFieldModule, MatInputModule, MatSelectModule,
  MatAutocompleteModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule];

@NgModule({
  declarations: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    LabourModalComponent,
    EllipsisPipe,
    SectionModalComponent,
    ReverseArrayPipe,
    PlaceNameFinderPipe,
    LineItemCrewComponent,
    InvitedSubcontractorsComponent,
    ViewQuotesComponent,
    ActiveTendersComponent,
    OrgNamePipe
  ],
  exports: [
    OrgNamePipe,
    EllipsisPipe,
    ReverseArrayPipe,
    PlaceNameFinderPipe,
    TagInputModule,
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    LineItemCrewComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    MaterialComponent,
    NgxTagsInputModule,
    InvitedSubcontractorsComponent,
    ActiveTendersComponent
    // NgxTagsInputModule
  ],
  imports: [
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxTagsInputModule,
    TagInputModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModule,
    MatToolbarModule,
    MaterialComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    LineItemCrewComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    LabourModalComponent,
    NotifySubcontractorComponent,
    SectionModalComponent,
    ViewQuotesComponent
  ]
})
export class SharedModule {}
