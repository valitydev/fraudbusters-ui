import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PaymentListsService } from '../../../api/payments/lists/payment-lists.service';
import { ConfigService } from '../../../config';
import { LAYOUT_GAP_M } from '../../../tokens';
import { ListType } from '../../constants/list-type';
import { SortOrder } from '../../constants/sort-order';
import { ErrorHandlerService } from '../../services/utils/error-handler.service';
import { SearchFieldService } from '../../services/utils/search-field.service';
import { RemoveRowListDialogComponent } from './remove-row-list/remove-row-list-dialog.component';

@Component({
    selector: 'fb-wb-list',
    templateUrl: './wb-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WbListComponent implements OnInit {
    @Input() listType: ListType;
    @Input() isCounting = false;

    listsRows = [];
    searchValue: FormControl = new FormControl('');
    listNames: string[] = [];
    selectedListNames: string[] = [];
    isLoadMore = false;
    displayedColumns = new ReplaySubject<string[]>();
    sortType = SortOrder.Desc;
    paymentColumns = ['listName', 'partyId', 'shopId', 'value', 'insertTime'];

    private size = this.configService.pageSize;

    constructor(
        private router: Router,
        private errorHandlerService: ErrorHandlerService,
        private searchFieldService: SearchFieldService,
        private listService: PaymentListsService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private configService: ConfigService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {
        this.displayedColumns.next([]);
    }

    ngOnInit(): void {
        this.getListNames();
        this.searchValue.valueChanges.pipe(debounceTime(300)).subscribe(() => {
            this.search();
        });
    }

    selectionChange(): void {
        this.displayedColumns.next(this.initColumns(this.paymentColumns));
        this.search();
    }

    getListNames(): void {
        this.listService.getNames(this.listType).subscribe(
            (names) => {
                this.listNames = names;
                this.selectedListNames = this.listNames;
                this.selectionChange();
            },
            (error: HttpErrorResponse) => {
                this.errorHandlerService.handleError(error, this.snackBar);
            }
        );
    }

    search(): void {
        this.searchWithSort(null, this.sortType, null);
    }

    navigateToNew(): void {
        this.router.navigate([`/list/${this.listType}/new`]);
    }

    sortData(sort: Sort): void {
        this.sortType = sort.direction === 'asc' ? SortOrder.Asc : SortOrder.Desc;
        this.search();
    }

    openDialog(listRecordRow): void {
        const dialogRef = this.dialog.open(RemoveRowListDialogComponent, {
            width: '350px',
            data: { listRecord: listRecordRow, listType: this.listType },
        });

        dialogRef.afterClosed().subscribe(() => {
            this.search();
        });
    }

    loadMore(): void {
        this.searchWithSort(
            this.listsRows[this.listsRows.length - 1].id,
            this.sortType,
            this.listsRows[this.listsRows.length - 1].insertTime
        );
    }

    private initColumns(columns: string[]): string[] {
        return this.isCounting ? columns.concat(['info', 'edit']) : columns.concat(['edit']);
    }

    private searchWithSort(lastInListName, sortOrder: SortOrder, sortFieldValueNew): void {
        this.listService
            .findListRows({
                searchValue: this.searchFieldService.formatField(this.searchValue.value),
                lastId: lastInListName,
                size: this.size,
                sortOrder: sortOrder ? sortOrder : SortOrder.Asc,
                sortFieldValue: sortFieldValueNew,
                listNames: this.selectedListNames,
                listType: this.listType,
            })
            .subscribe(
                (response) => {
                    if (!lastInListName) {
                        this.listsRows = response.result;
                    } else {
                        this.listsRows = this.listsRows.concat(response.result);
                    }
                    this.isLoadMore = this.listsRows.length < response.count;
                },
                (error: HttpErrorResponse) => {
                    this.errorHandlerService.handleError(error, this.snackBar);
                }
            );
    }
}
