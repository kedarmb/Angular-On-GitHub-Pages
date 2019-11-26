import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from '../upgrade/upgrade.component';
import { TenderComponent } from './tender/tender.component';
import { TenderitemComponent } from './tenderitem/tenderitem.component';
import { ViewTenderComponent } from './view-tender/view-tender.component';
import { OrganizationComponent } from './organization/organization.component';
import { CreateTenderItemComponent } from './create-tender-item/create-tender-item.component';
import { CrewComponent } from './crew/crew.component';
import { CreateCrewComponent } from './create-crew/create-crew.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { UserComponent } from './user/user.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MedicalComprehendComponent } from './medical-comprehend/medical-comprehend.component';
import { EquipmentsComponent } from 'app/admin-layout/equipments/equipments.component';
import { LabourComponent } from 'app/admin-layout/labour/labour.component';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';
import { NgModule } from '@angular/core';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'organization', component: OrganizationComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'comprehend', component: MedicalComprehendComponent },
    { path: 'pdf-viewer/:id', component: PdfViewerComponent },
    { path: 'crew', component: CrewComponent },
    { path: 'equipments', component: EquipmentsComponent },
    { path: 'labour', component: LabourComponent },
    { path: 'create-crew', component: CreateCrewComponent },
    { path: 'create-crew/:id', component: CreateCrewComponent },
    { path: 'create-tenderitem', component: CreateTenderItemComponent },
    { path: 'view-tender/:id', component: ViewTenderComponent },
    { path: 'tender', component: TenderComponent },
    { path: 'tender-items', component: TenderitemComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'user', component: UserComponent },
    { path: 'fullcalender', component: FullcalenderComponent }
    // { path: 'upgrade', component: UpgradeComponent },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'calculation', component: CalculationComponent },
    // { path: 'settings', component: SettingsComponent },


];
@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})

export class AdminLayoutRoutesModule { }

