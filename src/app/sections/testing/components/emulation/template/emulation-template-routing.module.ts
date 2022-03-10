import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard, Roles } from '../../../../../auth';
import { EmulationTemplateComponent } from './emulation-template.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EmulationTemplateComponent,
                canActivate: [AuthGuard],
                data: { roles: [Roles.FraudOfficer, Roles.FraudMonitoring, Roles.FraudSupport] },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class EmulationTemplateRoutingModule {}
