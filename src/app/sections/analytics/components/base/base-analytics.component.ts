import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LAYOUT_GAP_M } from '../../../../tokens';
import { Observable, Subject } from 'rxjs';
import { AnalyticsService } from '../../../../api/payments/analytics';

@Component({
    templateUrl: 'base-analytics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAnalyticsComponent implements OnInit {
    constructor(@Inject(LAYOUT_GAP_M) public layoutGapM: string) {}

    search($event) {}

    ngOnInit(): void {}
}
