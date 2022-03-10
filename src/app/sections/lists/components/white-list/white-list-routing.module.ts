import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../../../auth';
import { AddRowWhiteListComponent } from './add-row-white-list/add-row-white-list.component';
import { WhiteListComponent } from './white-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WhiteListComponent,
                canActivate: [AuthGuard],
                data: { roles: [Roles.FraudOfficer, Roles.FraudMonitoring] },
                children: [
                    {
                        path: 'new',
                        component: AddRowWhiteListComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer, Roles.FraudMonitoring] },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WhiteListRoutingModule {}
