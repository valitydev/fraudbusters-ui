import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../auth';
import { AnalyticsComponent } from './analytics.component';
import { BaseAnalyticsComponent } from './components/base/base-analytics.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AnalyticsComponent,
                canActivate: [AuthGuard],
                data: { roles: [Roles.FraudOfficer] },
                children: [
                    {
                        path: 'base',
                        component: BaseAnalyticsComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                    {
                        path: '',
                        redirectTo: 'base',
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
