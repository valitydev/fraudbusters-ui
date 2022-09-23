import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';

import { LAYOUT_GAP_M } from '../../../../../../../../tokens';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'fb-candidate-header',
    templateUrl: 'candidate-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateHeaderComponent {
    @Output()
    changedAll: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();

    constructor(@Inject(LAYOUT_GAP_M) public layoutGapM: string) {}

    changeAll($event) {
        this.changedAll.emit($event);
    }
}
