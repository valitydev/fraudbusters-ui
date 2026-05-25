import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'fb-bar-chart',
    templateUrl: 'bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges {
    @Input()
    series?: ApexAxisChartSeries;

    @Input()
    colors?: string[];

    @Input()
    height?: number;

    config = structuredClone(DEFAULT_CONFIG);

    ngOnChanges(changes: SimpleChanges) {
        if (changes.height && changes.height.currentValue !== changes.height.previousValue) {
            this.config.chart.height = this.height;
        }
    }
}
