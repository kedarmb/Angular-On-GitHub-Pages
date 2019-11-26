// import { AppRoutingModule } from 'app/app.routing';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent
  ],
  exports: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    NgbModule
  ],
  entryComponents: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent
  ]
})

export class SharedModule { }
