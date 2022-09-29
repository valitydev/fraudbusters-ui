import { NgModule } from '@angular/core';

import { AddRowListModule } from '../../../../shared/components/wb-list/components/add-row-list';
import { WbListModule } from '../../../../shared/components/wb-list/wb-list.module';
import { CandidatesComponent } from './candidates.component';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { EmptySearchResultModule } from '../../../../shared/components/empty-search-result';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ShowMorePanelModule } from '../../../../shared/components/show-more-panel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { ShowMoreContinuationPanelModule } from '../../../../shared/components/show-more-panel-continuation';
import { CandidatesSearchComponent } from './components/candidates-search/candidates-search.component';
import { CandidatesListModule } from './components/candidates-list';
import { SearchFieldService } from '../../../../shared/services/utils/search-field.service';

@NgModule({
    declarations: [CandidatesComponent, CandidatesSearchComponent],
    imports: [
        FlexModule,
        MatButtonModule,
        MatCardModule,
        CommonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTabsModule,
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        EmptySearchResultModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        ShowMorePanelModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        ShowMoreContinuationPanelModule,
        WbListModule,
        AddRowListModule,
        CandidatesListModule,
    ],
    providers: [SearchFieldService],
})
export class CandidatesModule {}
