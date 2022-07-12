import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LAYOUT_GAP_M } from '../../../../tokens';
import { BaseAnalyticsService } from './services/base-analytics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: 'base-analytics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAnalyticsComponent {
    private readonly _yyyyMMDdHHMmSs = 'yyyy-MM-dd HH:mm:ss';

    colors = ['#1ab152', '#c4c4c4', '#cf1c1d'];

    attemptedPayments$ = this.baseAnalyticsService.attemptedPayments$;
    blockedPayments$ = this.baseAnalyticsService.blockedPayments$;
    blockedRates$ = this.baseAnalyticsService.blockedRates$;
    blockSum$ = this.baseAnalyticsService.blockSum$;
    fraudSummary$ = this.baseAnalyticsService.fraudSummary$;

    chartData$ = this.baseAnalyticsService.chartDataX$;

    inProgress$ = this.baseAnalyticsService.inProgress$;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private baseAnalyticsService: BaseAnalyticsService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string,
        protected datepipe: DatePipe
    ) {}

    search($event) {
        this.baseAnalyticsService.search({
            fromTime: this.datepipe.transform(this.todayFromTime($event.time).toISOString(), this._yyyyMMDdHHMmSs),
            toTime: this.datepipe.transform(new Date().toISOString(), this._yyyyMMDdHHMmSs),
            currency: $event.type,
            merchantId: $event.partyId,
            shopId: $event.shopId,
            splitUnit: this.getSplitUnitFromTime($event.time),
        });
    }

    todayFromTime(time): Date {
        let diffDay = 1;
        switch (time) {
            case '1 day': {
                diffDay = 1;
                break;
            }
            case '1 week': {
                diffDay = 7;
                break;
            }
            case 'last month': {
                return this.getDaysInCurrentMonth();
            }
            case 'last year': {
                return this.getDaysYear();
            }
            default: {
                diffDay = 1;
                break;
            }
        }
        const now = new Date();
        now.setDate(now.getDate() - diffDay);
        now.setHours(0, 0, 0, 0);
        return now;
    }

    getSplitUnitFromTime(time): string {
        switch (time) {
            case '1 day': {
                return 'hour';
            }
            case 'last year': {
                return 'month';
            }
            default: {
                return 'day';
            }
        }
    }

    getDaysInCurrentMonth() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), 0);
    }

    getDaysYear() {
        return new Date(new Date().getFullYear(), 0, 0);
    }
}
