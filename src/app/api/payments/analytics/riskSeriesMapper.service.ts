import { Injectable } from '@angular/core';
import { SplitRiskScoreCountRatioResponse } from '../../fb-management/swagger-codegen/model/splitRiskScoreCountRatioResponse';
import { Series } from '../../../sections/analytics/model/chart-data';
import { RiskScoreOffsetCountRatio } from '../../fb-management/swagger-codegen/model/riskScoreOffsetCountRatio';

@Injectable()
export class RiskSeriesMapperService {
    mapSeries(response: SplitRiskScoreCountRatioResponse) {
        return response.offsetCountRatios.map(
            (value) =>
                ({
                    name: value.score,
                    data: value.offsetCountRatio.map((offsetCountRatioValue) => ({
                        x: this.getX(offsetCountRatioValue.offset, response.splitUnit),
                        y: offsetCountRatioValue.countRatio,
                        fillColor: this.getFillColor(value),
                    })),
                } as Series)
        );
    }

    private getFillColor(value: RiskScoreOffsetCountRatio) {
        switch (value.score) {
            case 'low':
                return '#1ab152';
            case 'fatal':
                return '#cf1c1d';
            default:
                return '#c4c4c4';
        }
    }

    private getX(value: number, splitUnit: string) {
        const ADDITIONAL_FOR_FIX_ZERO_START = 1;
        switch (splitUnit) {
            case 'hour':
                return new Date(value).getHours() + ADDITIONAL_FOR_FIX_ZERO_START;
            case 'month':
                return new Date(value).getMonth() + ADDITIONAL_FOR_FIX_ZERO_START;
            case 'day':
                return new Date(value).getDay() + ADDITIONAL_FOR_FIX_ZERO_START;
            default:
                return new Date(value).getDay() + ADDITIONAL_FOR_FIX_ZERO_START;
        }
    }
}
