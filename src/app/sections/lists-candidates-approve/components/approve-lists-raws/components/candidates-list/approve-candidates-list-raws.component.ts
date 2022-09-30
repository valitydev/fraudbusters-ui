import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NEVER, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { WbListRecord } from '../../../../../../api/fb-management/swagger-codegen/model/wbListRecord';
import { PaymentListsService } from '../../../../../../api/payments/lists';
import { ConfigService } from '../../../../../../config';
import { SortOrder } from '../../../../../../shared/constants/sort-order';
import { ErrorHandlerService } from '../../../../../../shared/services/utils/error-handler.service';
import { LAYOUT_GAP_M } from '../../../../../../tokens';
import { FetchCandidatesRecordService } from './services/fetch-candidates-record.service';

@Component({
    selector: 'fb-approve-candidates-list-raws',
    templateUrl: 'approve-candidates-list-raws.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchCandidatesRecordService, ErrorHandlerService],
})
export class ApproveCandidatesListRawsComponent {
    candidates$ = this.fetchCandidatesRecordService.searchResult$;
    inProgress$ = this.fetchCandidatesRecordService.inProgress$;
    hasMore$ = this.fetchCandidatesRecordService.hasMore$;

    approve$ = new Subject<string[]>();

    wbListRecords: WbListRecord[];
    allSelected = false;

    searchValue = '';

    @Output()
    approveItem = new EventEmitter<WbListRecord>();

    selectedRecords: WbListRecord[] = [];

    private SIZE = this.configService.pageSize;

    constructor(
        private fetchCandidatesRecordService: FetchCandidatesRecordService,
        private configService: ConfigService,
        private paymentListsService: PaymentListsService,
        private errorHandlerService: ErrorHandlerService,
        private snackBar: MatSnackBar,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {
        this.candidates$
            .pipe(
                tap((res) => {
                    this.wbListRecords = res;
                })
            )
            .subscribe();
        this.approve$
            .pipe(
                switchMap((ids) =>
                    this.paymentListsService.approveCandidates(ids).pipe(
                        catchError((error: HttpErrorResponse) => {
                            this.snackBar.open(`${error.status}: ${error.message}`, 'ERROR', {
                                duration: 1500,
                            });
                            return NEVER;
                        })
                    )
                )
            )
            .subscribe((value) => {
                if (value === 'OK') {
                    this.snackBar.open(`Candidates approved`, 'OK', {
                        duration: 1000,
                    });
                    this.search(this.searchValue);
                }
            });
    }

    search(searchValue: string) {
        this.searchValue = searchValue;
        this.fetchCandidatesRecordService.search({ sortOrder: SortOrder.Desc, searchValue, size: this.SIZE });
    }

    onChange($event) {
        if (this.selectedRecords.includes($event)) {
            this.selectedRecords.splice(
                this.selectedRecords.findIndex((value) => Object.is(value, $event)),
                1
            );
        } else {
            this.selectedRecords.push($event);
        }
    }

    onChangeAll($event) {
        if ($event.checked) {
            this.selectedRecords = Array.from(this.wbListRecords);
            this.allSelected = true;
        } else {
            this.selectedRecords = new Array<WbListRecord>();
            this.allSelected = false;
        }
    }

    approveCandidates() {
        this.approve$.next(this.selectedRecords.map((value) => value.id));
    }

    fetchMore() {}
}
