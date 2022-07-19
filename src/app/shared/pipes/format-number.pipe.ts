import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
    transform(num: any): number {
        return num !== 'NaN' && !!num ? num : 0.0;
    }
}
