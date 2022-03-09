import { PaymentReference } from '../../../api/fb-management/swagger-codegen/model/paymentReference';
import { SortOrder } from '../../constants/sort-order';

export enum ActionType {
    CreateReference = 'createReference',
    EditReference = 'editReference',
    RemoveReference = 'removeReference',
    SortReferences = 'sortReferences',
    GoToTemplate = 'goToTemplate',
}

export interface Action {
    type: ActionType;
    reference?: PaymentReference;
    sortDirection?: SortOrder;
}
