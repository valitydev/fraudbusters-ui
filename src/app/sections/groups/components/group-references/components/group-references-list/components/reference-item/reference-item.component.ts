import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LAYOUT_GAP_M, LAYOUT_GAP_S } from '../../../../../../../../tokens';
import { GroupReference } from '../../../../../../../../api/fb-management/swagger-codegen/model/groupReference';

@Component({
    selector: 'fb-reference-item',
    templateUrl: 'reference-item.component.html',
    styleUrls: ['reference-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceItemComponent {
    @Input()
    reference: GroupReference;

    @Output()
    goToGroup = new EventEmitter<string>();

    @Output()
    deleteItem = new EventEmitter<GroupReference>();

    constructor(@Inject(LAYOUT_GAP_S) public layoutGapS: string, @Inject(LAYOUT_GAP_M) public layoutGapM: string) {}
}
