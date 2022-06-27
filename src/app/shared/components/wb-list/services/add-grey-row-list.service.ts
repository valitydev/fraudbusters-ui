import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Papa } from 'ngx-papaparse';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { progress } from '../../../../shared/operators';
import { CsvUtilsService } from '../../../../shared/services/utils/csv-utils.service';
import { WbListService } from '../wb-list.service';
import { ListType } from '../../../constants/list-type';

@Injectable()
export class AddGreyRowListService {
    created$: Observable<string | string[]>;
    inProgress$: Observable<boolean>;

    private create$ = new Subject<ListType>();
    private errors$ = new Subject();

    forms = this.fb.array([]);

    constructor(
        private fb: FormBuilder,
        private wbListService: WbListService,
        private snackBar: MatSnackBar,
        private csvUtilsService: CsvUtilsService,
        private papa: Papa
    ) {
        this.addItem();
        this.created$ = this.create$.pipe(
            switchMap(() => {
                return this.wbListService
                    .saveListRow(
                        ListType.Grey,
                        this.forms.value.map((rec) => ({
                            countInfo: rec,
                            listRecord: rec,
                        }))
                    )
                    .pipe(
                        catchError((error: HttpErrorResponse) => {
                            this.snackBar.open(`${error.status}: ${error.message}`, 'ERROR');
                            this.errors$.next();
                            return EMPTY;
                        })
                    );
            }),
            filter((r) => !!r),
            shareReplay(1)
        );
        this.created$.subscribe((value) => {
            this.forms.reset();
        });
        this.inProgress$ = progress(this.create$, merge(this.created$, this.errors$));
        this.inProgress$.subscribe((inProgress) => {
            if (inProgress) {
                this.forms.disable();
            } else {
                this.forms.enable();
            }
        });
    }

    create() {
        this.create$.next();
    }

    addItem() {
        this.forms.push(this.createItem());
    }

    removeItem(i: number) {
        this.forms.removeAt(i);
    }

    prepareFilesList(files: Array<any>): void {
        Object.values(files)
            .filter((value) => this.csvUtilsService.isValidFile(value, 'text/csv', 2097152))
            .forEach((item) =>
                this.papa.parse(item, {
                    skipEmptyLines: true,
                    header: true,
                    complete: (results) => {
                        const data = results.data;
                        if (
                            this.csvUtilsService.isValidFormatCsv(data, item, [
                                'listName',
                                'partyId',
                                'shopId',
                                'value',
                                'count',
                                'startCountTime',
                                'endCountTime',
                            ])
                        ) {
                            this.processCsv(data);
                        }
                    },
                })
            );
    }

    private processCsv(data): void {
        for (const item of data) {
            this.forms.push(
                this.createItem(
                    item.listName,
                    item.partyId,
                    item.shopId,
                    item.value,
                    item.count,
                    item.startCountTime,
                    item.endCountTime
                )
            );
        }
        this.forms.patchValue(this.forms.value);
    }

    private createItem(listName = '', partyId = '', shopId = '', value = '', count = 0, startTime?, endTime?) {
        return this.fb.group({
            listName: [listName, Validators.required],
            partyId: [partyId, Validators.required],
            shopId: [shopId],
            value: [value, Validators.required],
            count: [count, Validators.required],
            startCountTime: [startTime, Validators.required],
            endCountTime: [endTime, Validators.required],
        });
    }
}
