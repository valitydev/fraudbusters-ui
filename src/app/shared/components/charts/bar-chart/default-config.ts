import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_ANIMATION } from '../default-animation';
import { DEFAULT_LEGEND } from '../default-legend';
import { DEFAULT_STATES } from '../default-states';
import { formatAmount } from '../format-amount';

const COLUMN_WIDTH = '30%';

export const DEFAULT_CONFIG: ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        height: 350,
        width: '100%',
        toolbar: {
            show: false,
        },
        animations: DEFAULT_ANIMATION,
    },
    dataLabels: {
        enabled: false,
    },
    legend: DEFAULT_LEGEND,
    fill: {
        opacity: 1,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: COLUMN_WIDTH,
        },
    },
    xaxis: {
        type: 'datetime',
        labels: {
            offsetY: -5,
            rotate: 0,
        },
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        forceNiceScale: true,
        labels: {
            formatter: formatAmount,
        },
    },
    states: DEFAULT_STATES,
};
