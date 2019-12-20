import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderModalComponent } from './components/tender-modal/tender-modal.component';
import { TrenchModalComponent } from './components/trench-modal/trench-modal.component';
import { CrewModalComponent } from './components/crew-modal/crew-modal.component';
import { OrganizationModalComponent } from './components/organization-modal/organization-modal.component';
import { EquipmentsModalComponent } from './components/equipments-modal/equipments-modal.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { NotifySubcontractorComponent } from './components/notify-subcontractor/notify-subcontractor.component';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import {
  MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule,
  MatButtonToggleModule, MatIconModule, MatBadgeModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule,
  MatMenuModule, MatListModule, MatDividerModule, MatGridListModule, MatExpansionModule, MatTabsModule, MatStepperModule,
  MatAutocompleteModule, MatDialogModule
} from '@angular/material';
// import { , MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LabourModalComponent } from './components/labour-modal/labour-modal.component';
import { MatCardModule } from '@angular/material/card';
import { EllipsisPipe } from './pipe/ellipsis.pipe';

//
const MaterialComponent = [
  MatButtonModule, MatButtonToggleModule,
  MatIconModule, MatBadgeModule,
  MatProgressSpinnerModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule,
  MatListModule, MatDividerModule,
  MatGridListModule, MatExpansionModule,
  MatCardModule, MatTabsModule, MatStepperModule,
  MatFormFieldModule, MatInputModule, MatSelectModule,
  MatAutocompleteModule, MatDialogModule];

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
    EllipsisPipe
  ],
  exports: [
    EllipsisPipe,
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    MaterialComponent
  ],
  imports: [
    
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
  ],
  entryComponents: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    LabourModalComponent,
    NotifySubcontractorComponent
  ]
})

export class SharedModule { }