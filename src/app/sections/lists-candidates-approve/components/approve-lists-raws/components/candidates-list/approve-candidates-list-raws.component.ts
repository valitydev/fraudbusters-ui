import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { LAYOUT_GAP_M } from '../../../../../../tokens';
import { WbListCandidateBatch } from '../../../../../../api/fb-management/swagger-codegen/model/wbListCandidateBatch';

@Component({
    selector: 'fb-approve-candidates-list-raws',
    templateUrl: 'approve-candidates-list-raws.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveCandidatesListRawsComponent {
    @Input()
    candidates: WbListCandidateBatch[];

    @Output()
    approveItem = new EventEmitter<string>();

    @Output()
    deleteItem = new EventEmitter<string>();

    constructor(@Inject(LAYOUT_GAP_M) public layoutGapM: string) {}

    search($event) {}

    approveCandidates() {}
}
