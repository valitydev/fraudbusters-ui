import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Group } from '../../../api/fb-management/swagger-codegen/model/group';
import { PaymentGroupsService } from '../../../api/payments/groups';
import { ConfigService } from '../../../config';
import { SortOrder } from '../../../shared/constants/sort-order';
import { booleanDebounceTime } from '../../../shared/operators';
import { FetchResult, PartialFetcher } from '../../../shared/utils/partial-fetcher';

export interface FetchTemplatesParams {
    searchValue?: string;
    sortOrder?: SortOrder;
    pageSize?: number;
}

@Injectable()
export class FetchGroupsService extends PartialFetcher<Group, FetchTemplatesParams> {
    inProgress$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    private pageSize = this.configService.pageSize;

    constructor(private paymentGroupsService: PaymentGroupsService, private configService: ConfigService) {
        super();
    }

    protected fetch(params: FetchTemplatesParams, lastId?: string): Observable<FetchResult<Group>> {
        return this.paymentGroupsService.filter(params.searchValue);
    }
}
