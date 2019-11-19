import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
// import { CalculationComponent } from './calculation/calculation.component';
// import { SettingsComponent } from './settings/settings.component';
// import { QuoteComponent } from './quote/quote.component';
//  import { LabourAndEquipmentsComponent } from './labour-and-equipments/labour-and-equipments.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DatepickerComponent,
    
    // SettingsComponent,
    // QuoteComponent,
    //  LabourAndEquipmentsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
