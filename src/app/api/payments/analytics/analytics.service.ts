import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../../../config';
import { filterParameters } from '../../../shared/utils/filter-params';
import { ListResponse } from '../../fb-management/swagger-codegen/model/listResponse';
import { map } from 'rxjs/operators';
import { SearchAnalyticsCurrenciesParams } from '../../../sections/analytics/components/search/search-currencies-params';

@Injectable()
export class AnalyticsService {
    private readonly fbAnalyticsDictionaries = `${this.configService.fbManagementEndpoint}/dictionaries`;

    constructor(private http: HttpClient, private configService: ConfigService) {}

    getCurrencies(params: SearchAnalyticsCurrenciesParams): Observable<string[]> {
        return this.http
            .get<ListResponse>(`${this.fbAnalyticsDictionaries}/currencies`, {
                params: filterParameters(params),
            })
            .pipe(map((response: ListResponse) => response.result));
    }
}
