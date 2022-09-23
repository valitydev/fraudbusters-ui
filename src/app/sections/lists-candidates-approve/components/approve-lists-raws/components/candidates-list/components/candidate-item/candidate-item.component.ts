import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LAYOUT_GAP_M, LAYOUT_GAP_S } from '../../../../../../../../tokens';
import { WbListCandidateBatch } from '../../../../../../../../api/fb-management/swagger-codegen/model/wbListCandidateBatch';
import { Payment } from '../../../../../../../../api/fb-management/swagger-codegen/model/payment';

@Component({
    selector: 'fb-candidate-item',
    templateUrl: 'candidate-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateItemComponent {
    @Input()
    candidate: WbListCandidateBatch;

    @Output()
    changed: EventEmitter<WbListCandidateBatch> = new EventEmitter<WbListCandidateBatch>();

    @Input()
    enabled = false;

    constructor(@Inject(LAYOUT_GAP_S) public layoutGapS: string, @Inject(LAYOUT_GAP_M) public layoutGapM: string) {}

    emmitChange() {
        this.enabled = !this.enabled;
        this.changed.emit(this.candidate);
    }
}
