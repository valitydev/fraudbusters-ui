import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { Refund } from '../../../../../api/fb-management/swagger-codegen/model/refund';
import { LAYOUT_GAP_M } from '../../../../../tokens';

@Component({
    selector: 'fb-historical-data-refunds-list',
    templateUrl: 'historical-data-refunds-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalDataRefundsListComponent {
    @Input()
    refunds: Refund[];

    constructor(@Inject(LAYOUT_GAP_M) public layoutGapM: string) {}
}
