import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/shared.module';
import { SidebarModule } from 'ng-sidebar';
import { SidenavComponent } from './sidenav/sidenav.component';
// import { CalculationComponent } from './calculation/calculation.component';
// import { SettingsComponent } from './settings/settings.component';
//  import { LabourAndEquipmentsComponent } from './labour-and-equipments/labour-and-equipments.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    SidebarModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SidenavComponent

    // DatepickerComponent
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, SidenavComponent]
})
export class LayoutsModule {}
