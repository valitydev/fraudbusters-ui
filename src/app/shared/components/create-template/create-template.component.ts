import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Template } from '../../../api/fb-management/swagger-codegen/model/template';
import { LAYOUT_GAP_L, LAYOUT_GAP_M } from '../../../tokens';
import { OperationType } from '../../constants/operation-type';
import { checkValidateResponse } from '../../services/utils/check-validation-response';
import { ErrorHandlerService } from '../../services/utils/error-handler.service';
import { TemplateService } from './services/template/template.service';

@Component({
    selector: 'fb-create-template',
    templateUrl: './create-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TemplateService],
})
export class CreateTemplateComponent implements OnInit {
    @Input() template: Template;
    @Input() editName = true;

    form = this.templateService.form;

    saved$ = this.templateService.saved$;
    validated$ = this.templateService.validated$;
    inProgress$ = this.templateService.inProgress$;

    constructor(
        private router: Router,
        private templateService: TemplateService,
        private errorHandlerService: ErrorHandlerService,
        private snackBar: MatSnackBar,
        @Inject(LAYOUT_GAP_L) public layoutGapL: string,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}

    ngOnInit() {
        if (this.template) {
            this.form.setValue({ id: this.template.id, template: this.template.template });
            if (this.editName === false) {
                this.form.get('id').disable();
            }
        }
        this.saved$.subscribe(
            (template) => {
                if (this.template) {
                    this.snackBar.open(`Saved success: ${template.id}`, 'OK', {
                        duration: 3000,
                    });
                } else {
                    this.snackBar.open(`Template has been created`, 'OK', {
                        duration: 3000,
                    });
                    this.navigateToEdit(template.id);
                }
            },
            (error: HttpErrorResponse) => this.errorHandlerService.handleError(error, this.snackBar)
        );
        this.validated$.subscribe(
            (response) => {
                this.snackBar.open(checkValidateResponse(response), 'OK', {
                    duration: 3000,
                });
            },
            (error: HttpErrorResponse) => this.errorHandlerService.handleError(error, this.snackBar)
        );
    }

    saveTemplate() {
        this.templateService.saveTemplate({
            template: { id: this.form.getRawValue().id, template: this.form.getRawValue().template },
        });
    }

    validateTemplate() {
        this.templateService.validateTemplate({
            template: { id: this.form.getRawValue().id, template: this.form.getRawValue().template },
        });
    }

    navigateToEdit(id) {
        this.router.navigate([`../template/${id}`]);
    }

    back() {
        this.router.navigate([`../templates`]);
    }
}
