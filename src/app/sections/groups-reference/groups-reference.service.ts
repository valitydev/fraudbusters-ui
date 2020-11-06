import { Injectable } from '@angular/core';
import { OperationType } from '../../shared/constants/operation-type';
import { SortOrder } from '../../shared/constants/sort-order';
import { Observable } from 'rxjs';
import { OperationTypeManagementService } from '../../shared/services/operation-type-management.service';
import { GroupsReferenceResponse } from './model/groups-reference-response';
import { GroupReferenceModel } from './model/groups-reference';
import { SearchGroupsReferenceParams } from '../../shared/services/groups-reference/model/search-group-reference-params';

@Injectable()
export class GroupsReferenceService {
    constructor(private operationReferenceService: OperationTypeManagementService) {}

    getGroupsReferences(
        type: OperationType,
        size?: number,
        nameRegexp?: string,
        lastInListName?: string,
        sortOrder?: SortOrder,
        sortFieldValue?: string
    ): Observable<GroupsReferenceResponse> {
        return this.operationReferenceService
            .findGroupsReferenceService(type)
            .findGroups(
                new SearchGroupsReferenceParams(
                    nameRegexp,
                    lastInListName,
                    size,
                    sortOrder ? SortOrder[sortOrder] : SortOrder[SortOrder.ASC],
                    sortFieldValue
                )
            );
    }

    deleteGroupsReference(type: OperationType, reference: GroupReferenceModel): Observable<string> {
        return this.operationReferenceService.findGroupsReferenceService(type).deleteGroupReference(reference);
    }

    saveGroupsReference(type: OperationType, references: GroupReferenceModel[]): Observable<string[]> {
        return this.operationReferenceService.findGroupsReferenceService(type).saveGroupReference(references);
    }
}
