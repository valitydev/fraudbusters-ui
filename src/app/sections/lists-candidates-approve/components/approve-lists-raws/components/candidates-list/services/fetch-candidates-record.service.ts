import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { FetchResult, PartialFetcher } from '../../../../../../../shared/utils/partial-fetcher';
import { WbListRecord } from '../../../../../../../api/fb-management/swagger-codegen/model/wbListRecord';
import { SearchParams } from '../../../../../../../shared/model/search-params';
import { booleanDebounceTime } from '../../../../../../../shared/operators';
import { PaymentListsService } from '../../../../../../../api/payments/lists';

@Injectable()
export class FetchCandidatesRecordService extends PartialFetcher<WbListRecord, SearchParams> {
    inProgress$ = this.doAction$.pipe(booleanDebounceTime(0), shareReplay(1));

    constructor(private paymentListsService: PaymentListsService) {
        super();
    }

    fetch(params: SearchParams): Observable<FetchResult<WbListRecord>> {
        return this.paymentListsService.findCandidates(params);
    }
}
