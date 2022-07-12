import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { FraudSummaryHeaderComponent } from './components/fraud-summary-header/fraud-summary-header.component';
import { FraudSummaryItemComponent } from './components/fraud-summary-item/fraud-summary-item.component';
import { FraudSummaryListComponent } from './fraud-summary-list.component';
import { SharedPipesModule } from '../../../../../../shared/pipes';
import { ListHeaderModule } from '../../../../../../shared/components/list-header';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatDividerModule,
        SharedPipesModule,
        MatButtonModule,
        MatCardModule,
        ListHeaderModule,
    ],
    declarations: [FraudSummaryListComponent, FraudSummaryHeaderComponent, FraudSummaryItemComponent],
    exports: [FraudSummaryListComponent],
})
export class FraudSummaryListModule {}
