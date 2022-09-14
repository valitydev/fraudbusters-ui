import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { progress } from '../../../../shared/operators';
import { CsvUtilsService } from '../../../../shared/services/utils/csv-utils.service';
import { ListType } from '../../../constants/list-type';
import { WbListService } from '../wb-list.service';

@Injectable()
export class AddRowListService {
    created$: Observable<string | string[]>;
    inProgress$: Observable<boolean>;
    forms = this.fb.array([]);

    private loadedFile$ = new Subject<any>();
    private create$ = new Subject<ListType>();
    private errors$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private wbListService: WbListService,
        private snackBar: MatSnackBar,
        private csvUtilsService: CsvUtilsService
    ) {
        this.addItem();
        this.created$ = this.create$.pipe(
            switchMap((value) => {
                return this.wbListService
                    .saveListRow(
                        value,
                        this.forms.value.map((rec) => ({ listRecord: rec }))
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
            shareReplay(1, 1000)
        );

        this.loadedFile$
            .pipe(
                switchMap((value) => {
                    return this.wbListService.saveListRowsFromFile(value.listType, value.file).pipe(
                        catchError((error: HttpErrorResponse) => {
                            this.snackBar.open(`${error.status}: ${error.message}`, 'ERROR');
                            this.errors$.next();
                            return EMPTY;
                        })
                    );
                }),
                filter((r) => !!r),
                shareReplay(1, 1000)
            )
            .subscribe({ next: () => this.snackBar.open('File success send to load', 'OK') });

        this.created$.subscribe(() => {
            this.forms = this.fb.array([]);
            this.addItem();
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

    create(listType: ListType) {
        this.create$.next(listType);
    }

    addItem() {
        this.forms.push(this.createItem());
    }

    removeItem(i: number) {
        this.forms.removeAt(i);
    }

    saveFileWithListRaws(listType: ListType, file: File): void {
        if (this.csvUtilsService.isValidFile(file, 'text/csv', 2097152)) {
            this.loadedFile$.next({ file, listType });
        }
    }

    private createItem(listName = '', partyId = '', shopId = '', value = '') {
        return this.fb.group({
            listName: [listName, Validators.required],
            partyId: [partyId],
            shopId: [shopId],
            value: [value, Validators.required],
        });
    }
}
