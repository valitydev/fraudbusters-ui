import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { GroupReference } from '../../../../api/fb-management/swagger-codegen/model/groupReference';
import { SortOrder } from '../../../../shared/constants/sort-order';
import { Action, ActionType } from '../../model/action';
import { PaymentGroupReferenceModel } from '../../model/payment-groups-reference';

@Component({
    templateUrl: 'references-table.component.html',
    selector: 'fb-references-table',
    styleUrls: ['references-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesTableComponent {
    @Output()
    action: EventEmitter<Action> = new EventEmitter();

    @Input()
    references: PaymentGroupReferenceModel[];

    @Input()
    displayedColumns: string[];

    sort(sort: Sort): void {
        switch (sort.direction) {
            case 'asc':
                this.action.emit({ type: ActionType.SortReferences, sortDirection: SortOrder.Asc });
                break;
            case 'desc':
                this.action.emit({ type: ActionType.SortReferences, sortDirection: SortOrder.Desc });
                break;
        }
    }

    removeReference(reference: GroupReference): void {
        this.action.emit({ type: ActionType.RemoveReference, reference });
    }
}
