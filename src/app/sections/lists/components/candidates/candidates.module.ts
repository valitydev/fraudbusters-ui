import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EmptySearchResultModule } from '../../../../shared/components/empty-search-result';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { ShowMorePanelModule } from '../../../../shared/components/show-more-panel';

import { MatNativeDateModule } from '@angular/material/core';

import { ShowMoreContinuationPanelModule } from '../../../../shared/components/show-more-panel-continuation';
import { AddRowListModule } from '../../../../shared/components/wb-list/components/add-row-list';
import { WbListModule } from '../../../../shared/components/wb-list/wb-list.module';
import { SearchFieldService } from '../../../../shared/services/utils/search-field.service';
import { CandidatesComponent } from './candidates.component';
import { CandidatesListModule } from './components/candidates-list';
import { CandidatesSearchComponent } from './components/candidates-search/candidates-search.component';

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
