import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, _MatMenuDirectivesModule } from '@angular/material/menu';

import { ListHeaderModule } from '../../../../../../shared/components/list-header';
import { SharedPipesModule } from '../../../../../../shared/pipes';
import { ActionsComponent } from './components/actions/actions.component';
import { ReferenceHeaderComponent } from './components/reference-header/reference-header.component';
import { ReferenceItemComponent } from './components/reference-item/reference-item.component';
import { GroupReferencesListComponent } from './group-references-list.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatExpansionModule,
        MatCardModule,
        MatDividerModule,
        SharedPipesModule,
        MatButtonModule,
        _MatMenuDirectivesModule,
        MatIconModule,
        MatMenuModule,
        ListHeaderModule,
    ],
    declarations: [GroupReferencesListComponent, ReferenceHeaderComponent, ReferenceItemComponent, ActionsComponent],
    exports: [GroupReferencesListComponent],
})
export class GroupReferencesListModule {}
