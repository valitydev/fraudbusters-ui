import { NgModule } from '@angular/core';

import { AddRowListModule } from '../../../shared/components/wb-list/components/add-row-list/add-row-list.module';
import { WbListModule } from '../../../shared/components/wb-list/wb-list.module';
import { AddRowWhiteListComponent } from './add-row-white-list/add-row-white-list.component';
import { WhiteListRoutingModule } from './white-list-routing.module';
import { WhiteListComponent } from './white-list.component';

@NgModule({
    declarations: [WhiteListComponent, AddRowWhiteListComponent],
    imports: [WhiteListRoutingModule, WbListModule, AddRowListModule],
})
export class WhiteListModule {}
