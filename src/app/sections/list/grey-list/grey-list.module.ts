import { NgModule } from '@angular/core';

import { AddGreyRowListModule } from '../../../shared/components/wb-list/components/add-grey-row-list';
import { WbListModule } from '../../../shared/components/wb-list/wb-list.module';
import { AddRowGreyListComponent } from './add-row-grey-list/add-row-grey-list.component';
import { GreyListRoutingModule } from './grey-list-routing.module';
import { GreyListComponent } from './grey-list.component';

@NgModule({
    declarations: [GreyListComponent, AddRowGreyListComponent],
    imports: [GreyListRoutingModule, WbListModule, AddGreyRowListModule],
})
export class GreyListModule {}
