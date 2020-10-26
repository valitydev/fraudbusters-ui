import { Injectable } from '@angular/core';
import { OperationType } from '../shared/constants/operation-type';
import { SortOrder } from '../shared/constants/sort-order';
import { Observable } from 'rxjs';
import { ReferencesResponse } from '../references/model/references-response';
import { SearchReferenceParams } from '../shared/services/reference/model/SearchReferenceParams';
import { Reference } from '../references/model/reference';
import { OperationTypeManagementService } from '../shared/services/operation-type-management.service';
import { GroupsReferenceResponse } from './model/groups-reference-response';

@Injectable({
    providedIn: 'root',
})
export class GroupsReferenceService {
    constructor(private operationReferenceService: OperationTypeManagementService) {}

    getGroupsReferences(
        type: OperationType,
        size?: number,
        nameRegexp?: string,
        lastInListName?: string,
        sortOrder?: SortOrder
    ): Observable<GroupsReferenceResponse> {
        return this.operationReferenceService
            .findGroupsReferenceService(type)
            .findGroups(
                new SearchReferenceParams(
                    nameRegexp,
                    lastInListName,
                    size,
                    sortOrder ? SortOrder[sortOrder] : SortOrder[SortOrder.ASC]
                )
            );
    }

    deleteGroupsReference(type: OperationType, reference: Reference): Observable<string> {
        return this.operationReferenceService.findReferenceService(type).deleteReference(reference);
    }

    saveGroupsReference(type: OperationType, reference: Reference): Observable<string> {
        return this.operationReferenceService.findReferenceService(type).saveReference(reference);
    }
}
