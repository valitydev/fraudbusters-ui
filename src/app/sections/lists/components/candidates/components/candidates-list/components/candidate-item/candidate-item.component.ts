import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LAYOUT_GAP_M, LAYOUT_GAP_S } from '../../../../../../../../tokens';
import { WbListCandidateBatch } from '../../../../../../../../api/fb-management/swagger-codegen/model/wbListCandidateBatch';

@Component({
    selector: 'fb-candidate-item',
    templateUrl: 'candidate-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateItemComponent {
    @Input()
    candidate: WbListCandidateBatch;

    @Output()
    approveItem = new EventEmitter<string>();

    @Output()
    deleteItem = new EventEmitter<string>();

    constructor(@Inject(LAYOUT_GAP_S) public layoutGapS: string, @Inject(LAYOUT_GAP_M) public layoutGapM: string) {}
}
