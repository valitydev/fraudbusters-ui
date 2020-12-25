import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'fb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(private keycloakService: KeycloakService) {}

    logout(): void {
        this.keycloakService.logout();
    }
}
