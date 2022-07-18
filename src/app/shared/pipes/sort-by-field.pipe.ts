import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sort' })
export class ArraySortPipe implements PipeTransform {
    transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
            return;
        }
        array.sort((a: any, b: any) => {
            if (this.deepValue(a, field) < this.deepValue(b, field)) {
                return 1;
            } else if (this.deepValue(a, field) > this.deepValue(b, field)) {
                return -1;
            } else {
                return 0;
            }
        });
        return array;
    }

    deepValue(obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        }
        return obj;
    }
}
