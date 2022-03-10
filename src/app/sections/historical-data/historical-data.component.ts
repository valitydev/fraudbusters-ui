import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { hasActiveFragments } from '../../shared/utils/has-active-fragments';
import { LAYOUT_GAP_S } from '../../tokens';

@Component({
    templateUrl: 'historical-data.component.html',
    styleUrls: ['historical-data.component.scss'],
})
export class HistoricalDataComponent {
    links = [
        {
            path: 'inspect-results',
            name: 'Inspect results',
            otherActiveUrlFragments: [],
        },
        {
            path: 'payments',
            name: 'Payments',
            otherActiveUrlFragments: [],
        },
        {
            path: 'refunds',
            name: 'Refunds',
            otherActiveUrlFragments: [],
        },
        {
            path: 'chargebacks',
            name: 'Chargebacks',
            otherActiveUrlFragments: [],
        },
        {
            path: 'fraud-payments',
            name: 'Fraud payments',
            otherActiveUrlFragments: [],
        },
    ];

    constructor(private router: Router, @Inject(LAYOUT_GAP_S) public layoutGapS: string) {}

    hasActiveFragments(fragments: string[]): boolean {
        const ulrFragments = this.router.url.split('/');
        return hasActiveFragments(fragments, ulrFragments);
    }
}
