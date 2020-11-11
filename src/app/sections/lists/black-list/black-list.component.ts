import { Component } from '@angular/core';
import { ListType } from '../../../shared/constants/list-type';

@Component({
    selector: 'app-black-list',
    templateUrl: './black-list.component.html',
    styleUrls: ['./black-list.component.scss'],
})
export class BlackListComponent {
    LIST_TYPE = ListType.black;
}
