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
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app.routing';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent, OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    EquipmentsModalComponent
  ],
  exports: [
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent, 
    OrganizationModalComponent,
    EquipmentsModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    TenderModalComponent,
    TrenchModalComponent,
    CrewModalComponent,
    OrganizationModalComponent,
    UserModalComponent,
    NotifySubcontractorComponent,
    EquipmentsModalComponent
  ],
  imports: [
    CommonModule,
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
    NgbModule
  ]
})
export class SharedModule { }
