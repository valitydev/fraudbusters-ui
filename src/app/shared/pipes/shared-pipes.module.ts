import { NgModule } from '@angular/core';

import { PaymentStatusToColorPipe } from './payment-status-to-color.pipe';
import { TemplateToRulesPipe } from './template-to-rules.pipe';

@NgModule({
    declarations: [TemplateToRulesPipe, PaymentStatusToColorPipe],
    exports: [TemplateToRulesPipe, PaymentStatusToColorPipe],
})
export class SharedPipesModule {}
