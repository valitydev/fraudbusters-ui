import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PaymentTemplatesModule } from '../../api';
import { PaymentListsService } from '../../api/payments/lists';
import { EmptySearchResultModule } from '../../shared/components/empty-search-result';
import { SearchFieldService } from '../../shared/services/utils/search-field.service';
import { ApproveListsRawsComponent } from './components/approve-lists-raws/approve-lists-raws.component';
import { CandidatesBatchesTableModule } from './components/approve-lists-raws/components/candidates-list';
import { ListsCandidatesBatchesRoutingModule } from './lists-candidates-batches-routing.module';
import { ListsCandidatesBatchesComponent } from './lists-candidates-batches.component';

@NgModule({
    declarations: [ListsCandidatesBatchesComponent, ApproveListsRawsComponent],
    imports: [
        EmptySearchResultModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        ListsCandidatesBatchesRoutingModule,
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
        CandidatesBatchesTableModule,
    ],
    providers: [SearchFieldService, PaymentListsService],
})
export class ListsCandidatesBatchesModule {}
