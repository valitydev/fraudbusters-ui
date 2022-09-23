import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, take } from 'rxjs/operators';
import { removeEmptyProperties } from '../../../../../../../../shared/utils/remove-empty-properties';
import { Observable } from 'rxjs';

@Component({
    selector: 'fb-approve-candidates-list-raws-search',
    templateUrl: 'approve-candidates-list-raws-search.component.html',
    styleUrls: ['search.component.scss'],
})
export class ApproveCandidatesListRawsSearchComponent {
    @Output() valueChanges: EventEmitter<string> = new EventEmitter();

    @Input() listNames$: Observable<string[]>;

    form: FormGroup = this.fb.group({
        searchQuery: '',
    });

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
        this.form.valueChanges.pipe(debounceTime(600), map(removeEmptyProperties)).subscribe((v) => {
            this.router.navigate([location.pathname], { queryParams: v });
            this.valueChanges.emit(v.searchQuery);
        });
        this.route.queryParams.pipe(take(1)).subscribe((v) => this.form.patchValue(v));
    }
}
