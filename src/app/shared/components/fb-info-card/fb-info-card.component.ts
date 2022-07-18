import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'fb-info-card',
    templateUrl: 'fb-info-card.component.html',
    styleUrls: ['fb-info-card.component.scss'],
})
export class FbInfoCardComponent implements OnInit {
    @Input() headerText: string;
    @Input() value: Observable<number>;
    @Input() units = '';
    @Input() type: string;
    @Input() inProgress: Observable<boolean>;

    valueNumber = 0;

    ngOnInit(): void {
        this.value.subscribe((value) => (this.valueNumber = value ? value : 0));
    }

    numberFormat(num) {
        return num === 'NaN' ? 0 : num;
    }
}
