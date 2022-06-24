import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, merge, NEVER, Observable, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { PaymentListsService } from '../../../../api/payments/lists';
import { progress } from '../../../../shared/operators';
import { ConfirmActionDialogComponent } from '../../confirm-action-dialog';

export interface RemoveListRowParams {
    rowId: string;
}

@Injectable()
export class RemoveWbListComponentService {
    removed$: Observable<string>;
    inProgress$: Observable<boolean>;

    private removeRow$ = new Subject<RemoveListRowParams>();
    private hasError$ = new Subject();

    constructor(
        private dialog: MatDialog,
        private paymentListsService: PaymentListsService,
        private snackBar: MatSnackBar
    ) {
        this.removed$ = this.removeRow$.pipe(
            switchMap((params) =>
                combineLatest([
                    of(params),
                    this.dialog
                        .open(ConfirmActionDialogComponent, { data: { title: `Remove row ${params.rowId}?` } })
                        .afterClosed()
                        .pipe(filter((r) => r === 'confirm')),
                ])
            ),
            switchMap(([params]) =>
                this.paymentListsService.deleteListRow(params.rowId).pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.snackBar.open(`${error.status}: ${error.message}`, 'OK', {
                            duration: 1500,
                        });
                        this.hasError$.next();
                        return NEVER;
                    })
                )
            ),
            shareReplay(1)
        );

        this.inProgress$ = progress(this.removeRow$, merge(this.hasError$, this.removed$));
    }

    remove(params: RemoveListRowParams) {
        this.removeRow$.next(params);
    }
}
