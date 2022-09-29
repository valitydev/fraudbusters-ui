import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../auth';
import { ListsCandidatesApproveComponent } from './lists-candidates-approve.component';
import { ApproveListsRawsComponent } from './components/approve-lists-raws/approve-lists-raws.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ListsCandidatesApproveComponent,
                canActivate: [AuthGuard],
                data: { roles: [Roles.FraudOfficer] },
                children: [
                    {
                        path: ':id',
                        component: ApproveListsRawsComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ListsCandidatesApproveRoutingModule {}