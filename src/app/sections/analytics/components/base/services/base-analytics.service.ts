import { Injectable } from '@angular/core';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { AnalyticsService } from '../../../../../api/payments/analytics';
import { SearchBaseAnalyticsParams } from '../../../../../api/payments/analytics/searchBaseAnalyticsParams';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';
import { ChartData } from '../../../model/chart-data';
import { FraudResultSummary } from '../../../../../api/fb-management/swagger-codegen/model/fraudResultSummary';

@Injectable()
export class BaseAnalyticsService {
    currencies$: Observable<string[]>;
    attemptedPayments$: Observable<number>;
    blockedPayments$: Observable<number>;
    blockedRates$: Observable<number>;
    blockSum$: Observable<number>;
    fraudSummary$: Observable<FraudResultSummary[]>;

    chartDataX$: Observable<ChartData>;

    searchParameters$ = new Subject<SearchBaseAnalyticsParams>();

    inProgress$ = new Subject<boolean>();
    finished$ = new Observable<void>();

    constructor(private analyticsService: AnalyticsService) {
        // this.inProgress$.next(true);

        this.currencies$ = this.analyticsService.getCurrencies();

        // this.searchParameters$.subscribe(() => this.inProgress$.next(true));
        this.fraudSummary$ = this.searchParameters$.pipe(
            switchMap((value) => this.analyticsService.getSummary(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.attemptedPayments$ = this.searchParameters$.pipe(
            switchMap((value) => this.analyticsService.getAttemptedPaymentsCount(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.blockedPayments$ = this.searchParameters$.pipe(
            switchMap((value) => this.analyticsService.getBlockedPaymentsCount(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.blockedRates$ = this.searchParameters$.pipe(
            switchMap((value) => this.analyticsService.getBlockedPaymentsRatio(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.blockSum$ = this.searchParameters$.pipe(
            switchMap((value) => this.analyticsService.getBlockedPaymentsSum(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.chartDataX$ = this.searchParameters$.pipe(
            catchError((err, caught) => {
                return EMPTY;
            }),
            switchMap((value) => this.analyticsService.getSplitCountRatio(value)),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.finished$.subscribe((value) => this.inProgress$.next(false));
        merge(
            this.attemptedPayments$,
            this.blockedPayments$,
            this.blockedRates$,
            this.blockSum$,
            this.chartDataX$,
            this.fraudSummary$
        )
            .pipe(
                switchMap((value) => this.finished$),
                shareReplay(1)
            )
            .subscribe();
    }

    search(params): void {
        this.searchParameters$.next(params);
    }
}
