import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LAYOUT_GAP_M } from '../../../../tokens';
import { BaseAnalyticsService } from './services/base-analytics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BaseAnalyticsUtilService } from './services/base-analytics-util.service';

@Component({
    templateUrl: 'base-analytics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAnalyticsComponent {
    private readonly _yyyyMMDdHHMmSs = 'yyyy-MM-dd HH:mm:ss';

    SUCCESS_STYLE = 'success';
    ERROR_STYLE = 'error';

    BLOCKED_SUM = 'Blocked sum';
    RATIO_OF_BLOCKED = 'Ratio of blocked';
    BLOCKED_PAYMENTS = 'Blocked payments';
    ATTEMPTED_PAYMENTS = 'Attempted payments';

    colors = ['#1ab152', '#c4c4c4', '#cf1c1d'];

    attemptedPayments$ = this.baseAnalyticsService.attemptedPayments$;
    blockedPayments$ = this.baseAnalyticsService.blockedPayments$;
    ratioOfBlocked$ = this.baseAnalyticsService.ratioOfBlocked$;
    blockedSum$ = this.baseAnalyticsService.blockedSum$;
    fraudSummary$ = this.baseAnalyticsService.fraudSummary$;
    chartData$ = this.baseAnalyticsService.chartDataX$;
    inProgress$ = this.baseAnalyticsService.inProgress$;

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
