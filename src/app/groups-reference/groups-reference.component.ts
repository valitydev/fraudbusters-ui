import { Component, OnInit } from '@angular/core';
import { OperationType } from '../shared/constants/operation-type';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/utils/error-handler.service';
import { ReferencesService } from '../references/references.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '../core/config.service';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-groups-reference',
    templateUrl: './groups-reference.component.html',
    styleUrls: ['./groups-reference.component.scss'],
})
export class GroupsReferenceComponent implements OnInit {
    groupReferences = [];
    searchValue = '';
    operationType: OperationType;
    operationTypes;

    private SIZE: number;

    constructor(
        private router: Router,
        private errorHandlerService: ErrorHandlerService,
        private referenceService: ReferencesService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        configService: ConfigService
    ) {
        this.SIZE = configService.config.pageSize;
        this.displayedColumns.next(['groupId', 'edit']);
    }

    isLoadMore = false;
    references = [];
    displayedColumns = new ReplaySubject<string[]>();

    ngOnInit(): void {
        this.operationTypes = Object.keys(OperationType);
        this.operationType = this.operationTypes[0];
        this.selectionChange();
    }

    selectionChange(): void {
        if (this.operationType === OperationType.Payment) {
            this.displayedColumns.next(['groupId', 'partyId', 'shopId', 'edit']);
        } else {
            this.displayedColumns.next(['groupId', 'identityId', 'edit']);
        }
        this.search();
    }

    search(): void {}

    changeSearch(event): void {}

    sortData(event): void {}

    openDialog(event): void {}

    loadMore(): void {}

    navigateToNew(): void {
        this.router.navigate(['/groups-reference/new'], { fragment: this.operationType });
    }

    navigateToEdit(id): void {
        this.router.navigate([`/groups-references/${id}`], { fragment: this.operationType });
    }
}
