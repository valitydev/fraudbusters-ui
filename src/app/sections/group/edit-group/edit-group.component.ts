import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaymentGroupsService } from '../../../api/payments/groups';
import { map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { LAYOUT_GAP_L, LAYOUT_GAP_M } from '../../../tokens';

@Component({
    templateUrl: './edit-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupComponent {
    group$ = this.route.params.pipe(
        pluck('id'),
        withLatestFrom(),
        switchMap(([id]) => {
            return this.paymentGroupsService.filter(id);
        }),
        pluck('result'),
        map((res) => res[0]),
        shareReplay(1)
    );

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private paymentGroupsService: PaymentGroupsService,
        @Inject(LAYOUT_GAP_L) public layoutGapL: string,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}
}
