import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeadlineModule } from '../../../headline';
import { AddRowListComponent } from './add-row-list.component';
import { PaymentListsService } from '../../../../../api/payments/lists';
import { ErrorHandlerService } from '../../../../services/utils/error-handler.service';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { AddRowListService } from '../../services/add-row-list.service';
import { WbListService } from '../../wb-list.service';
import { CsvUtilsService } from '../../../../services/utils/csv-utils.service';

@NgModule({
    declarations: [AddRowListComponent],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FormsModule,
        FlexModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressBarModule,
        HeadlineModule,
    ],
    exports: [AddRowListComponent],
    providers: [PaymentListsService, ErrorHandlerService, AddRowListService, WbListService, CsvUtilsService],
})
export class AddRowListModule {}
