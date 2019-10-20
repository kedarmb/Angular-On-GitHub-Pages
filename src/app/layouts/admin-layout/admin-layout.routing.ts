import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {TenderComponent} from '../../tender/tender.component';
import {TenderitemComponent} from '../../tenderitem/tenderitem.component';
import {ViewTenderComponent} from '../../view-tender/view-tender.component';
import {OrganizationModalComponent} from '../../modal/organization-modal/organization-modal.component';
import {OrganizationComponent} from '../../organization/organization.component';
import {CreateTenderItemComponent} from '../../create-tender-item/create-tender-item.component';
import {CrewComponent} from '../../crew/crew.component';
import {CreateCrewComponent} from '../../create-crew/create-crew.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {
        path: 'dashboard', component: DashboardComponent
    },
    {path: 'organization', component: OrganizationComponent},
    {path: 'crew', component: CrewComponent},
    {path: 'create-crew', component: CreateCrewComponent},
    {path: 'create-crew/:id', component: CreateCrewComponent},
    {path: 'create-tenderitem', component: CreateTenderItemComponent},
    {path: 'view-tender/:id', component: ViewTenderComponent},
    {path: 'tender', component: TenderComponent},
    {path: 'tender-items', component: TenderitemComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
