import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { AuthGuard } from '../../auth/auth-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'groups',
                component: GroupsComponent,
                canActivate: [AuthGuard],
                data: { roles: ['fraud-officer'] },
            },
            {
                path: 'groups/new',
                component: CreateGroupComponent,
                canActivate: [AuthGuard],
                data: { roles: ['fraud-officer'] },
            },
            {
                path: 'groups/:id',
                component: EditGroupComponent,
                canActivate: [AuthGuard],
                data: { roles: ['fraud-officer'] },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class GroupsRoutingModule {}
