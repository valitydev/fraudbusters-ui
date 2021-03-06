import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { FraudPayment } from '../../../../../api/fb-management/swagger-codegen/model/fraudPayment';
import { LAYOUT_GAP_M } from '../../../../../tokens';

@Component({
    selector: 'fb-historical-data-fraud-payments-list',
    templateUrl: 'historical-data-fraud-payments-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalDataFraudPaymentsListComponent {
    @Input()
    fraudPayments: FraudPayment[];

    constructor(@Inject(LAYOUT_GAP_M) public layoutGapM: string) {}
}
