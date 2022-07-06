import { Component, Input } from '@angular/core';

@Component({
    selector: 'fb-info-card',
    templateUrl: 'fb-info-card.component.html',
    styleUrls: ['fb-info-card.component.scss'],
})
export class FbInfoCardComponent {
    @Input() headerText: string;
    @Input() value: string;
    @Input() units = '';
    @Input() type: string;
}
