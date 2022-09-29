import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { booleanDebounceTime } from '../../../../../shared/operators';
import { FetchResult, PartialFetcher } from '../../../../../shared/utils/partial-fetcher';
import { PaymentListsService } from '../../../../../api/payments/lists';
import { WbListCandidateBatch } from '../../../../../api/fb-management/swagger-codegen/model/wbListCandidateBatch';
import { SearchParams } from '../../../../../shared/model/search-params';

@Injectable()
export class FetchCandidatesService extends PartialFetcher<WbListCandidateBatch, SearchParams> {
    inProgress$ = this.doAction$.pipe(booleanDebounceTime(0), shareReplay(1));

    constructor(private paymentListsService: PaymentListsService) {
        super();
    }

    fetch(params: SearchParams): Observable<FetchResult<WbListCandidateBatch>> {
        return this.paymentListsService.findCandidatesBatch(params);
    }
}
