import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, merge, NEVER, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { PaymentGroupsService } from '../../../api/payments/groups';
import { ConfirmActionDialogComponent } from '../../../shared/components/confirm-action-dialog';
import { progress } from '../../../shared/operators';

export interface RemoveGroupParams {
    id: string;
}

@Injectable()
export class RemoveGroupService {
    private removeGroup$ = new Subject<RemoveGroupParams>();
    private hasError$ = new Subject();

    removed$ = this.removeGroup$.pipe(
        switchMap((params) =>
            combineLatest([
                of(params),
                this.dialog
                    .open(ConfirmActionDialogComponent, { data: { title: `Remove group ${params.id}?` } })
                    .afterClosed()
                    .pipe(filter((r) => r === 'confirm')),
            ])
        ),
        switchMap(([params]) =>
            this.paymentGroupsService.delete(params.id).pipe(
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

    inProgress$ = progress(this.removeGroup$, merge(this.hasError$, this.removed$));

    constructor(
        private dialog: MatDialog,
        private paymentGroupsService: PaymentGroupsService,
        private snackBar: MatSnackBar
    ) {}

    remove(params: RemoveGroupParams) {
        this.removeGroup$.next(params);
    }
}
