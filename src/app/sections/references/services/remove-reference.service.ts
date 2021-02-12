import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, EMPTY, merge, of, Subject } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '../../../shared/components/confirm-action-dialog';
import { OperationType } from '../../../shared/constants/operation-type';
import { progress } from '../../../shared/operators';
import { OperationTypeManagementService } from '../../../shared/services/operation-type-management.service';
import { Reference } from '../../reference/model/reference';

export interface RemoveReferenceParams {
    type: OperationType;
    reference: Reference;
}

@Injectable()
export class RemoveReferenceService {
    private removeReference$ = new Subject<RemoveReferenceParams>();
    private hasError$ = new Subject();

    removed$ = this.removeReference$.pipe(
        switchMap((params) =>
            combineLatest([
                of(params),
                this.dialog
                    .open(ConfirmActionDialogComponent, { data: { title: `Remove reference ${params.reference.id}?` } })
                    .afterClosed()
                    .pipe(filter((r) => r === 'confirm')),
            ])
        ),
        switchMap(([params]) =>
            this.operationTypeManagementService
                .findReferenceService(params.type)
                .deleteReference(params.reference)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.snackBar.open(`${error.status}: ${error.message}`, 'OK', {
                            duration: 1500,
                        });
                        this.hasError$.next();
                        return of(EMPTY);
                    })
                )
        )
    );

    inProgress$ = progress(this.removeReference$, merge(this.hasError$, this.removed$));

    constructor(
        private dialog: MatDialog,
        private operationTypeManagementService: OperationTypeManagementService,
        private snackBar: MatSnackBar
    ) {
        this.removed$.subscribe();
    }

    removeReference(params: RemoveReferenceParams) {
        this.removeReference$.next(params);
    }
}