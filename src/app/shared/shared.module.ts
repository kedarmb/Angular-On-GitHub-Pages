import { LayoutModule } from '../layout/layout.module';
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
import { CityNamePipe } from './pipe/city-name.pipe';
import { CountryNamePipe } from './pipe/country-name.pipe';
import { StateNamePipe } from './pipe/state-name.pipe';
import { LineItemCrewComponent } from './components/line-item-crew/line-item-crew.component';
import { ViewQuotesComponent } from './components/view-quotes/view-quotes.component';

//
const MaterialComponent = [
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
    CityNamePipe,
    CountryNamePipe,
    StateNamePipe,
    LineItemCrewComponent,
    ViewQuotesComponent
  ],
  exports: [
    EllipsisPipe,
    ReverseArrayPipe,
    CityNamePipe,
    CountryNamePipe,
    StateNamePipe,
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
    NgxTagsInputModule
    // NgxTagsInputModule
  ],
  imports: [
    NgxTagsInputModule,
    TagInputModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
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
    SectionModalComponent
  ]
})

export class SharedModule { }
