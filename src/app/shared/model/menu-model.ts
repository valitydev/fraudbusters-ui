import { Roles } from '../../auth';
import { NavItem } from './nav-item';

export class MenuModel {
    public static navItems: NavItem[] = [
        {
            displayName: 'Templates',
            iconName: 'business',
            route: 'templates',
            roles: [Roles.FraudOfficer],
        },
        {
            displayName: 'Groups',
            iconName: 'group_work',
            route: 'groups',
            roles: [Roles.FraudOfficer],
        },
        {
            displayName: 'Lists',
            iconName: 'list_alt',
            route: 'lists',
            roles: [Roles.FraudOfficer, Roles.FraudMonitoring],
        },
        {
            displayName: 'Historical data',
            iconName: 'history',
            route: 'historical-data/payments',
            roles: [Roles.FraudOfficer, Roles.FraudMonitoring],
        },
        {
            displayName: 'Testing',
            iconName: 'bug_report',
            route: 'testing/data-sets',
            roles: [Roles.FraudOfficer],
        },
        {
            displayName: 'Notifications',
            iconName: 'notifications',
            route: 'notifications',
            roles: [Roles.FraudOfficer],
        },
        {
            displayName: 'Audit',
            iconName: 'wysiwyg',
            route: 'audit',
            roles: [Roles.FraudOfficer, Roles.FraudMonitoring],
        },
    ];
}
