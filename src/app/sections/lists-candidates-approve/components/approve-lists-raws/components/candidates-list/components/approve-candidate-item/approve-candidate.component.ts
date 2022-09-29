import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LAYOUT_GAP_M, LAYOUT_GAP_S } from '../../../../../../../../tokens';
import { WbListRecord } from '../../../../../../../../api/fb-management/swagger-codegen/model/wbListRecord';

@Component({
    selector: 'fb-approve-candidate-item',
    templateUrl: 'approve-candidate.component.html',
    styleUrls: ['approve-candidate-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveCandidateComponent {
    @Input()
    candidate: WbListRecord;

    @Output()
    approve: EventEmitter<WbListRecord> = new EventEmitter<WbListRecord>();

    @Input()
    enabled = false;

    constructor(@Inject(LAYOUT_GAP_S) public layoutGapS: string, @Inject(LAYOUT_GAP_M) public layoutGapM: string) {}

    emmitChange() {
        this.enabled = !this.enabled;
        this.approve.emit(this.candidate);
    }
}
