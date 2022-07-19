import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
    transform(num: any): any {
        return num !== 'NaN' && !!num ? num : 0.0;
    }
}
