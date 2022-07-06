import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { FbInfoCardComponent } from './fb-info-card.component';

@NgModule({
    declarations: [FbInfoCardComponent],
    exports: [FbInfoCardComponent],
    imports: [MatCardModule, FlexModule, CommonModule],
})
export class FbInfoCardModule {}
