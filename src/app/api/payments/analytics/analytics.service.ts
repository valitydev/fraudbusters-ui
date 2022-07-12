import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../../../config';
import { ListResponse } from '../../fb-management/swagger-codegen/model/listResponse';
import { map } from 'rxjs/operators';
import { CountResponse } from '../../fb-management/swagger-codegen/model/countResponse';
import { filterParameters } from '../../../shared/utils/filter-params';
import { SearchBaseAnalyticsParams } from './searchBaseAnalyticsParams';
import { SumResponse } from '../../fb-management/swagger-codegen/model/sumResponse';
import { RatioResponse } from '../../fb-management/swagger-codegen/model/ratioResponse';
import { SplitRiskScoreCountRatioResponse } from '../../fb-management/swagger-codegen/model/splitRiskScoreCountRatioResponse';
import { FraudResultListSummaryResponse } from '../../fb-management/swagger-codegen/model/fraudResultListSummaryResponse';
import { FraudResultSummary } from '../../fb-management/swagger-codegen/model/fraudResultSummary';
import { ChartData, Series } from '../../../sections/analytics/model/chart-data';
import { RiskScoreOffsetCountRatio } from '../../fb-management/swagger-codegen/model/riskScoreOffsetCountRatio';

@Injectable()
export class AnalyticsService {
    private readonly fbAnalyticsUrl = `${this.configService.fbManagementEndpoint}/analytics`;

    constructor(private http: HttpClient, private configService: ConfigService) {}

    getCurrencies(): Observable<string[]> {
        return this.http
            .get<ListResponse>(`${this.fbAnalyticsUrl}/currencies`)
            .pipe(map((response: ListResponse) => response.result));
    }

    getAttemptedPaymentsCount(paramsRes: SearchBaseAnalyticsParams): Observable<number> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/count`, {
                params: filterParameters(paramsRes),
            })
            .pipe(map((response: CountResponse) => response.count));
    }

    getBlockedPaymentsCount(paramsRes: SearchBaseAnalyticsParams): Observable<number> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/blocked/count`, {
                params: filterParameters(paramsRes),
            })
            .pipe(map((response: CountResponse) => response.count));
    }

    getBlockedPaymentsRatio(paramsRes: SearchBaseAnalyticsParams): Observable<number> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/blocked/count/ratio`, {
                params: filterParameters(paramsRes),
            })
            .pipe(map((response: RatioResponse) => response.ratio));
    }

    getBlockedPaymentsSum(paramsRes: SearchBaseAnalyticsParams): Observable<number> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/blocked/sum`, {
                params: filterParameters(paramsRes),
            })
            .pipe(map((response: SumResponse) => response.sum));
    }

    getSplitCountRatio(paramsRes: SearchBaseAnalyticsParams): Observable<ChartData> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/scores/split-count/ratio`, {
                params: filterParameters(paramsRes),
            })
            .pipe(
                map((response: SplitRiskScoreCountRatioResponse) => {
                    let newVar = {
                        series: this.mapSeries(response),
                    } as ChartData;
                    console.log(newVar);
                    return newVar;
                })
            );
    }

    private mapSeries(response: SplitRiskScoreCountRatioResponse) {
        return response.offsetCountRatios.map(
            (value) =>
                ({
                    name: value.score,
                    data: value.offsetCountRatio.map((offsetCountRatioValue) => ({
                        x: this.getX(offsetCountRatioValue.offset, response.splitUnit),
                        y: offsetCountRatioValue.countRatio,
                        fillColor: this.getFillColor(value),
                    })),
                } as Series)
        );
    }

    private getFillColor(value: RiskScoreOffsetCountRatio) {
        switch (value.score) {
            case 'low':
                return '#1ab152';
            case 'fatal':
                return '#cf1c1d';
            default:
                return '#c4c4c4';
        }
    }

    private getX(value: number, splitUnit: string) {
        switch (splitUnit) {
            case 'hour':
                return new Date(value).getHours() + 1;
            case 'month':
                return new Date(value).getMonth() + 1;
            case 'day':
                return new Date(value).getDay() + 1;
            default:
                return new Date(value).getDay() + 1;
        }
    }

    getDaysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 0);
    }

    getSummary(paramsRes: SearchBaseAnalyticsParams): Observable<FraudResultSummary[]> {
        return this.http
            .get(`${this.fbAnalyticsUrl}/fraud-payments/results/summary`, {
                params: filterParameters(paramsRes),
            })
            .pipe(map((response: FraudResultListSummaryResponse) => response.result));
    }
}
