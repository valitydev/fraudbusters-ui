import { Component, OnInit } from '@angular/core';
import { ReferencesService } from '../references.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationType } from '../../../shared/constants/operation-type';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../shared/services/utils/error-handler.service';
import { OperationTypeComponent } from '../../../shared/components/operation-type-component';
import { PaymentReference } from '../model/payment-reference';
import { P2pReference } from '../model/p2p-reference';
import { P2pGroupReferenceModel } from '../../groups-reference/model/p2p-groups-reference';
import { PaymentGroupReferenceModel } from '../../groups-reference/model/payment-groups-reference';

@Component({
    selector: 'app-create-reference',
    templateUrl: './create-reference.component.html',
    styleUrls: ['./create-reference.component.scss'],
})
export class CreateReferenceComponent extends OperationTypeComponent implements OnInit {
    reference: PaymentReference | P2pReference;

    p2pReferences: P2pGroupReferenceModel[] = [];
    paymentReferences: PaymentGroupReferenceModel[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private referenceService: ReferencesService,
        private errorHandlerService: ErrorHandlerService,
        private snackBar: MatSnackBar
    ) {
        super();
    }

    ngOnInit(): void {
        this.getOperationTypeFromFragment();
    }

    getOperationTypeFromFragment(): void {
        this.route.fragment.subscribe((fragment: string) => {
            this.operationType = OperationType[fragment];
            this.addNewReference();
        });
    }

    addNewReference(): void {
        this.isPaymentReference()
            ? (this.paymentReferences = this.paymentReferences.concat([
                  new PaymentGroupReferenceModel(null, '', '', ''),
              ]))
            : (this.p2pReferences = this.p2pReferences.concat([new P2pGroupReferenceModel(null, '', '')]));
    }

    save(): void {
        console.log(this.reference);
        this.referenceService.saveReference(this.operationType, this.reference).subscribe(
            (id) => {
                this.navigateToList();
                this.snackBar.open(`Saved succeeded: ${id}`, 'OK', {
                    duration: 1500,
                });
            },
            (error: HttpErrorResponse) => this.errorHandlerService.handleError(error, this.snackBar)
        );
    }

    navigateToList(): void {
        this.router.navigate(['../references'], { fragment: this.operationType });
    }

    deleteRef(i): void {
        this.isPaymentReference() ? this.paymentReferences.splice(i, 1) : this.p2pReferences.splice(i, 1);
    }
}
