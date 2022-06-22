import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';
import { progress } from '../../../operators';
import { Group } from '../../../../api/fb-management/swagger-codegen/model/group';
import { PaymentGroupsService } from '../../../../api/payments/groups';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriorityId } from '../../../../api/fb-management/swagger-codegen/model/priorityId';

@Injectable()
export class GroupService {
    static defaultParams = {
        id: '',
    };

    private save$ = new Subject<Group>();
    private errors$ = new Subject();

    saved$ = this.save$.pipe(
        switchMap(() =>
            this.paymentGroupService.save({ groupId: this.form.value.id, priorityTemplates: this.forms.value }).pipe(
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.open(`${error.status}: ${error.message}`, 'ERROR');
                    this.errors$.next();
                    return EMPTY;
                })
            )
        ),
        filter((r) => !!r),
        shareReplay(1)
    );

    inProgress$ = progress(this.save$, this.saved$);

    constructor(
        private fb: FormBuilder,
        private paymentGroupService: PaymentGroupsService,
        private snackBar: MatSnackBar
    ) {
        this.addItem();
        this.save$.subscribe();
        this.inProgress$.subscribe((inProgress) => {
            if (inProgress) {
                this.forms.disable();
            } else {
                this.forms.enable();
            }
        });
    }

    form = this.fb.group(GroupService.defaultParams);
    forms = this.fb.array([]);

    save() {
        this.save$.next();
    }

    addItem() {
        this.forms.push(this.createItem());
    }

    clear() {
        this.forms.clear();
    }

    addItems(priorityIds: PriorityId[]) {
        priorityIds.forEach((priorityId) => this.forms.push(this.createItem(priorityId.id, priorityId.priority)));
    }

    removeItem(i: number) {
        this.forms.removeAt(i);
    }

    private createItem(id = '', priority = 0) {
        return this.fb.group({
            id: [id, Validators.required],
            priority: [priority, Validators.required],
        });
    }
}
