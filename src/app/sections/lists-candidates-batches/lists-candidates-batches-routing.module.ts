import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../auth';
import { ApproveListsRawsComponent } from './components/approve-lists-raws/approve-lists-raws.component';
import { ListsCandidatesBatchesComponent } from './lists-candidates-batches.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ListsCandidatesBatchesComponent,
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
export class ListsCandidatesBatchesRoutingModule {}
