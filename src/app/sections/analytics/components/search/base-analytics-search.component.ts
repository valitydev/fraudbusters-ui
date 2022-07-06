import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, take } from 'rxjs/operators';
import { removeEmptyProperties } from '../../../../shared/utils/remove-empty-properties';
import { AnalyticsService } from '../../../../api/payments/analytics';
import { Observable } from 'rxjs';

@Component({
    selector: 'fb-base-analytics-search',
    templateUrl: 'base-analytics-search.component.html',
    styleUrls: ['search.component.scss'],
})
export class BaseAnalyticsSearchComponent {
    @Output() valueChanges: EventEmitter<string> = new EventEmitter();

    currencies$: Observable<string[]>;

    form: FormGroup = this.fb.group({
        partyId: '.*',
        shopId: '.*',
        types: [],
        times: '',
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private analyticsService: AnalyticsService
    ) {
        this.form.valueChanges.pipe(debounceTime(600), map(removeEmptyProperties)).subscribe((v) => {
            const params = Object.create(v);
            params.partyId = v.partyId;
            params.shopId = v.shopId;
            params.types = v.types;
            params.times = v.times;
            this.router.navigate([location.pathname], { queryParams: params });
            this.valueChanges.emit(v);
        });
        this.route.queryParams.pipe(take(1)).subscribe((v) => this.form.patchValue(v));
        this.currencies$ = this.analyticsService.getCurrencies({});
    }
}
