import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MenuModel } from '../../model/menu-model';
import { NavItem } from '../../model/nav-item';

@Component({
    selector: 'fb-navigate-menu',
    templateUrl: './navigate-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigateMenuComponent {
    navItems: NavItem[] = MenuModel.NAV_ITEMS;
}
