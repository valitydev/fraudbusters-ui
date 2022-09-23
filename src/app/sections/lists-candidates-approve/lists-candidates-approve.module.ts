import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PaymentTemplatesModule } from '../../api';
import { NotificationsService } from '../../api/payments/notifications';
import { ErrorHandlerService } from '../../shared/services/utils/error-handler.service';
import { ListsCandidatesApproveRoutingModule } from './lists-candidates-approve-routing.module';
import { ListsCandidatesApproveComponent } from './lists-candidates-approve.component';
import { ApproveListsRawsComponent } from './components/approve-lists-raws/approve-lists-raws.component';
import { ApproveCandidatesListRawsModule } from './components/approve-lists-raws/components/candidates-list';

@NgModule({
    declarations: [ListsCandidatesApproveComponent, ApproveListsRawsComponent],
    imports: [
        MatSnackBarModule,
        ListsCandidatesApproveRoutingModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        PaymentTemplatesModule,
        FlexModule,
        MatIconModule,
        CommonModule,
        ApproveCandidatesListRawsModule,
    ],
    providers: [NotificationsService, ErrorHandlerService],
})
export class ListsCandidatesApproveModule {}
