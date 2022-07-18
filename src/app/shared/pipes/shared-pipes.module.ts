import { NgModule } from '@angular/core';

import { PaymentStatusToColorPipe } from './payment-status-to-color.pipe';
import { ArraySortPipe } from './sort-by-field.pipe';
import { TemplateToRulesPipe } from './template-to-rules.pipe';

@NgModule({
    declarations: [TemplateToRulesPipe, PaymentStatusToColorPipe, ArraySortPipe],
    exports: [TemplateToRulesPipe, PaymentStatusToColorPipe, ArraySortPipe],
})
export class SharedPipesModule {}
