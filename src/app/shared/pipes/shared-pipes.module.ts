import { NgModule } from '@angular/core';

import { FormatNumberPipe } from './format-number.pipe';
import { PaymentStatusToColorPipe } from './payment-status-to-color.pipe';
import { ArraySortPipe } from './sort-by-field.pipe';
import { TemplateToRulesPipe } from './template-to-rules.pipe';

@NgModule({
    declarations: [TemplateToRulesPipe, PaymentStatusToColorPipe, ArraySortPipe, FormatNumberPipe],
    exports: [TemplateToRulesPipe, PaymentStatusToColorPipe, ArraySortPipe, FormatNumberPipe],
})
export class SharedPipesModule {}
