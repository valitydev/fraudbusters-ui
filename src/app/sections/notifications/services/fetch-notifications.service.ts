import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Notification } from '../../../api/fb-management/swagger-codegen/model/notification';
import { NotificationsService } from '../../../api/payments/notifications';
import { ConfigService } from '../../../config';
import { SortOrder } from '../../../shared/constants/sort-order';
import { booleanDebounceTime } from '../../../shared/operators';
import { FetchResult, PartialFetcher } from '../../../shared/utils/partial-fetcher';

export interface FetchNotificationsParams {
    searchValue?: string;
    sortOrder?: SortOrder;
    pageSize?: number;
}

@Injectable()
export class FetchNotificationsService extends PartialFetcher<Notification, FetchNotificationsParams> {
    inProgress$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    constructor(private notificationsService: NotificationsService, private configService: ConfigService) {
        super();
    }

    protected fetch(params: FetchNotificationsParams, lastId?: string): Observable<FetchResult<Notification>> {
        return this.notificationsService.getNotifications();
    }
}
