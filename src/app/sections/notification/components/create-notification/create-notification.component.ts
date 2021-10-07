import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LAYOUT_GAP_L, LAYOUT_GAP_M } from '../../../../tokens';

@Component({
    templateUrl: './create-notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNotificationComponent {
    constructor(
        private router: Router,
        @Inject(LAYOUT_GAP_L) public layoutGapL: string,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}

    back() {
        this.router.navigate([`../notifications`]);
    }
}
