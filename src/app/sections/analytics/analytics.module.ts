import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmActionDialogModule } from '../../shared/components/confirm-action-dialog';
import { EmptySearchResultModule } from '../../shared/components/empty-search-result';
import { ShowMorePanelModule } from '../../shared/components/show-more-panel';
import { SharedPipesModule } from '../../shared/pipes';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { BaseAnalyticsComponent } from './components/base/base-analytics.component';
import { BaseAnalyticsSearchComponent } from './components/base/components/search/base-analytics-search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { SearchFieldService } from '../../shared/services/utils/search-field.service';
import { MatSelectModule } from '@angular/material/select';
import { AnalyticsService } from '../../api/payments/analytics';
import { FbInfoCardModule } from '../../shared/components/fb-info-card';
import { BarChartComponent } from '../../shared/components/charts/bar-chart/bar-chart.component';
import { BarChartModule } from '../../shared/components/charts';
import { BaseAnalyticsService } from './components/base/services/base-analytics.service';
import { FraudSummaryListModule } from './components/base/components/fraud-summary-list';
import { RiskSeriesMapperService } from '../../api/payments/analytics/riskSeriesMapper.service';
import { BaseAnalyticsUtilService } from './components/base/services/base-analytics-util.service';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        MatTabsModule,
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        ConfirmActionDialogModule,
        MatMenuModule,
        EmptySearchResultModule,
        SharedPipesModule,
        FlexModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        ShowMorePanelModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        MatSelectModule,
        FbInfoCardModule,
        BarChartModule,
        FraudSummaryListModule,
    ],
    declarations: [AnalyticsComponent, BaseAnalyticsComponent, BaseAnalyticsSearchComponent],
    providers: [AnalyticsService, RiskSeriesMapperService, BaseAnalyticsService, DatePipe, BaseAnalyticsUtilService],
})
export class AnalyticsModule {}
