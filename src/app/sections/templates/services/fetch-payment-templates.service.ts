import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { PaymentTemplatesService } from '../../../api/payment-templates';
import { ConfigService } from '../../../config';
import { SortOrder } from '../../../shared/constants/sort-order';
import { booleanDelay } from '../../../shared/operators';
import { FetchResult, PartialFetcher } from '../../../shared/utils/partial-fetcher';
import { Template } from '../../template/model/template';

export interface FetchTemplatesParams {
    searchValue?: string;
    sortOrder?: SortOrder;
    pageSize?: number;
}

@Injectable()
export class FetchPaymentTemplatesService extends PartialFetcher<Template, FetchTemplatesParams> {
    inProgress$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));
    private SIZE = this.configService.pageSize;

    constructor(private paymentTemplatesService: PaymentTemplatesService, private configService: ConfigService) {
        super();
    }

    protected fetch(params: FetchTemplatesParams, lastId?: string): Observable<FetchResult<Template>> {
        const { searchValue, sortOrder, pageSize } = params;
        return this.paymentTemplatesService.findTemplates({
            size: pageSize ? pageSize : this.SIZE,
            sortOrder: sortOrder || SortOrder.ASC,
            ...(searchValue ? { searchValue } : {}),
            ...(lastId ? { lastId } : {}),
        });
    }
}
