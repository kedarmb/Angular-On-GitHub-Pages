import { TenderFastMatchComponent } from './tender/tender-fast-match/tender-fast-match.component';
import { TenderFastListComponent } from './tender/tender-fast-list/tender-fast-list.component';
import { TenderFastCompareComponent } from './tender/tender-fast-compare/tender-fast-compare.component';
import { TenderFastQuoteComponent } from './tender/tender-fast-quote/tender-fast-quote.component';
import { TenderCompareComponent } from './tender/tender-compare/tender-compare.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TenderComponent } from './tender/tender.component';
import { TenderitemComponent } from './tenderitem/tenderitem.component';
import { ViewTenderComponent } from './tender/tender-quote/view-tender.component';
import { OrganizationComponent } from './organization/organization.component';
import { CreateTenderItemComponent } from './create-tender-item/create-tender-item.component';
import { CrewComponent } from './crew/crew.component';
// import { CreateCrewComponent } from './crew-components/create-crew/create-crew.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { UserComponent } from './user/user.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MedicalComprehendComponent } from './medical-comprehend/medical-comprehend.component';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';
import { NgModule } from '@angular/core';
import { TrenchCalculationComponent } from './trench-calculation/trench-calculation.component';
import { TenderBidComponent } from './tender/tender-bid/tender-bid.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'organization', component: OrganizationComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'comprehend', component: MedicalComprehendComponent },
    { path: 'pdf-viewer/:id', component: PdfViewerComponent },
    { path: 'crew', component: CrewComponent },
    { path: 'create-tenderitem', component: CreateTenderItemComponent },
    { path: 'view-tender/:id', component: ViewTenderComponent },
    { path: 'tender', component: TenderComponent },
    { path: 'tender-items', component: TenderitemComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'user', component: UserComponent },
    { path: 'fullcalender', component: FullcalenderComponent },
    { path: 'calculation', component: TrenchCalculationComponent },
    { path: 'compare',  component: TenderCompareComponent },
    { path: 'bid', component: TenderBidComponent },
    { path: 'fast-quote/:id/:id', component: TenderFastQuoteComponent },
    { path: 'fast-compare/:id', component: TenderFastCompareComponent },
    { path: 'fast-list/:id', component: TenderFastListComponent },
    { path: 'fast-match/:id', component: TenderFastMatchComponent }


];
@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})

export class AdminLayoutRoutesModule { }

