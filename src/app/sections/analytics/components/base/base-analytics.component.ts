import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LAYOUT_GAP_M } from '../../../../tokens';
import { BaseAnalyticsUtilService } from './services/base-analytics-util.service';
import { BaseAnalyticsService } from './services/base-analytics.service';

@Component({
    templateUrl: 'base-analytics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAnalyticsComponent {
    readonly successStyle = 'success';
    readonly errorStyle = 'error';
    readonly blockedSum = 'Blocked sum';
    readonly ratioOfBlocked = 'Ratio of blocked';
    readonly blockedPayments = 'Blocked payments';
    readonly attemptedPayments = 'Attempted payments';

    readonly colors = ['#1ab152', '#c4c4c4', '#cf1c1d'];

    attemptedPayments$ = this.baseAnalyticsService.attemptedPayments$;
    blockedPayments$ = this.baseAnalyticsService.blockedPayments$;
    ratioOfBlocked$ = this.baseAnalyticsService.ratioOfBlocked$;
    blockedSum$ = this.baseAnalyticsService.blockedSum$;
    fraudSummary$ = this.baseAnalyticsService.fraudSummary$;
    chartData$ = this.baseAnalyticsService.chartDataX$;
    inProgress$ = this.baseAnalyticsService.inProgress$;

    private readonly _yyyyMMDdHHMmSs = 'yyyy-MM-dd HH:mm:ss';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private baseAnalyticsService: BaseAnalyticsService,
        private baseAnalyticsUtilService: BaseAnalyticsUtilService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string,
        protected datepipe: DatePipe
    ) {}

    search($event) {
        if ($event.type) {
            this.baseAnalyticsService.search({
                fromTime: this.datepipe.transform(
                    this.baseAnalyticsUtilService.todayFromTime($event.time).toISOString(),
                    this._yyyyMMDdHHMmSs
                ),
                toTime: this.datepipe.transform(new Date().toISOString(), this._yyyyMMDdHHMmSs),
                currency: $event.type,
                merchantId: $event.partyId,
                shopId: $event.shopId,
                splitUnit: this.baseAnalyticsUtilService.getSplitUnitFromTime($event.time),
            });
        }
    }
}
