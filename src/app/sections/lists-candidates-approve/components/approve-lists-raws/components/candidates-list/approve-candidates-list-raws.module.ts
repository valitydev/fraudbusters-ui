import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { ListHeaderModule } from '../../../../../../shared/components/list-header';
import { SharedPipesModule } from '../../../../../../shared/pipes';
import { ActionsComponent } from './components/actions/actions.component';
import { CandidateHeaderComponent } from './components/candidate-header/candidate-header.component';
import { CandidateItemComponent } from './components/candidate-item/candidate-item.component';
import { ApproveCandidatesListRawsComponent } from './approve-candidates-list-raws.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApproveCandidatesListRawsSearchComponent } from './components/approve-candidates-list-raws-search/approve-candidates-list-raws-search.component';
import { EmptySearchResultModule } from '../../../../../../shared/components/empty-search-result';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
    ],
    declarations: [
        ApproveCandidatesListRawsComponent,
        CandidateHeaderComponent,
        CandidateItemComponent,
        ActionsComponent,
        ApproveCandidatesListRawsSearchComponent,
    ],
    exports: [ApproveCandidatesListRawsComponent],
})
export class ApproveCandidatesListRawsModule {}
