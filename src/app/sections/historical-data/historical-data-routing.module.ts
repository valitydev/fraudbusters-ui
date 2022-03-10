import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../auth';
import { HistoricalChargebacksDataComponent } from './components/chargebacks/historical-chargebacks-data.component';
import { HistoricalFraudPaymentsDataComponent } from './components/fraud-payments/historical-fraud-payments-data.component';
import { HistoricalInspectResultsDataComponent } from './components/inspect-results/historical-inspect-results-data.component';
import { HistoricalPaymentsDataComponent } from './components/payments/historical-payments-data.component';
import { HistoricalRefundsDataComponent } from './components/refunds/historical-refunds-data.component';
import { HistoricalDataComponent } from './historical-data.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HistoricalDataComponent,
                canActivate: [AuthGuard],
                data: { roles: [Roles.FraudOfficer] },
                children: [
                    {
                        path: 'inspect-results',
                        component: HistoricalInspectResultsDataComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                    {
                        path: 'payments',
                        component: HistoricalPaymentsDataComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                    {
                        path: 'refunds',
                        component: HistoricalRefundsDataComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                    {
                        path: 'fraud-payments',
                        component: HistoricalFraudPaymentsDataComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                    {
                        path: 'chargebacks',
                        component: HistoricalChargebacksDataComponent,
                        canActivate: [AuthGuard],
                        data: { roles: [Roles.FraudOfficer] },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class HistoricalDataRoutingModule {}
