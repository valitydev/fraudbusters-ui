import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'emulation/template',
        pathMatch: 'full',
    },
    {
        path: 'analytics',
        loadChildren: () => import('./analytics').then((m) => m.AnalyticsModule),
    },
    {
        path: 'templates',
        loadChildren: () => import('./templates').then((m) => m.TemplatesModule),
    },
    {
        path: 'template',
        loadChildren: () => import('./template').then((m) => m.TemplateModule),
    },
    {
        path: 'default-references',
        loadChildren: () => import('./default-reference').then((m) => m.DefaultReferenceModule),
    },
    {
        path: 'reference',
        loadChildren: () => import('./reference').then((m) => m.ReferenceModule),
    },
    {
        path: 'groups',
        loadChildren: () => import('./groups').then((m) => m.GroupsModule),
    },
    {
        path: 'group',
        loadChildren: () => import('./group').then((m) => m.GroupModule),
    },
    {
        path: 'create-group-reference',
        loadChildren: () => import('./create-group-reference').then((m) => m.CreateGroupReferenceModule),
    },
    {
        path: 'lists',
        loadChildren: () => import('./lists').then((m) => m.ListsModule),
    },
    {
        path: 'list',
        loadChildren: () => import('./list').then((m) => m.ListModule),
    },
    {
        path: 'load',
        loadChildren: () => import('./load').then((m) => m.LoadModule),
    },
    {
        path: 'emulation',
        loadChildren: () => import('./testing/components/emulation').then((m) => m.EmulationModule),
    },
    {
        path: 'testing',
        loadChildren: () => import('./testing').then((m) => m.TestingModule),
    },
    {
        path: 'data-sets',
        loadChildren: () => import('./data-set').then((m) => m.DataSetModule),
    },
    {
        path: 'notification',
        loadChildren: () => import('./notification').then((m) => m.NotificationModule),
    },
    {
        path: 'channel',
        loadChildren: () => import('./channel').then((m) => m.ChannelModule),
    },
    {
        path: 'notifications',
        loadChildren: () => import('./notifications').then((m) => m.NotificationsModule),
    },
    {
        path: 'audit',
        loadChildren: () => import('./audit').then((m) => m.AuditModule),
    },
    {
        path: 'historical-data',
        loadChildren: () => import('./historical-data').then((m) => m.HistoricalDataModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule],
})
export class SectionsRoutingModule {}
