import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EmptySearchResultModule } from '../../../../../../shared/components/empty-search-result';
import { ListHeaderModule } from '../../../../../../shared/components/list-header';
import { ShowMorePanelModule } from '../../../../../../shared/components/show-more-panel';
import { SharedPipesModule } from '../../../../../../shared/pipes';
import { ActionsComponent } from './components/actions/actions.component';
import { ApproveCandidateHeaderComponent } from './components/approve-candidate-header/approve-candidate-header.component';
import { ApproveCandidateComponent } from './components/approve-candidate-item/approve-candidate.component';
import { ApproveCandidatesListRawsComponent } from './approve-candidates-list-raws.component';

import { ApproveCandidatesListRawsSearchComponent } from './components/approve-candidates-list-raws-search/approve-candidates-list-raws-search.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShowMoreContinuationPanelModule } from '../../../../../../shared/components/show-more-panel-continuation';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatExpansionModule,
        MatDividerModule,
        SharedPipesModule,
        MatButtonModule,
        ListHeaderModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
        EmptySearchResultModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        ShowMorePanelModule,
        ShowMoreContinuationPanelModule,
    ],
    declarations: [
        ApproveCandidatesListRawsComponent,
        ApproveCandidateHeaderComponent,
        ApproveCandidateComponent,
        ActionsComponent,
        ApproveCandidatesListRawsSearchComponent,
    ],
    exports: [ApproveCandidatesListRawsComponent],
})
export class ApproveCandidatesListRawsModule {}
