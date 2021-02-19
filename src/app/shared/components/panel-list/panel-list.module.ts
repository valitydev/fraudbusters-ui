import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { PanelListComponent } from './panel-list.component';
import { SecondaryTitleDirective } from './secondary-title';

const EXPORTED_DECLARATIONS = [PanelListComponent, SecondaryTitleDirective];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS,
})
export class PanelListModule {}
