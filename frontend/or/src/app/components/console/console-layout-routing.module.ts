import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { appConfig } from '@app/shared/config/app.config';

import { ConsoleLayoutComponent } from './console-layout.component';
import { ConsoleDashboardIndexComponent } from './dashboard/index/console-dashboard-index.component';

const appRouteConfig = appConfig.routes;
const console = appRouteConfig.modules.console;
const modules = console.modules;

//#region organization
const orgModule = modules.organization;
const orgRoutes: Route = {
  path: orgModule.path,
  children: [
    {
      path: orgModule.modules.list.path,
      loadChildren: () => import('./organization/list/console-organization-list.module').then(mod => mod.ConsoleOrganizationListModule),
    },
    {
      path: orgModule.modules.create.path,
      loadChildren: () => import('./organization/edit/console-organization-edit.module').then(mod => mod.ConsoleOrganizationEditModule),
    },
    {
      path: orgModule.modules.update.path + orgModule.modules.update.params,
      loadChildren: () => import('./organization/edit/console-organization-edit.module').then(mod => mod.ConsoleOrganizationEditModule),
    },
  ]
};

//#endregion

//#region expert
const expertModule = modules.expert;
const expertRoutes: Route = {
  path: expertModule.path,
  children: [
    {
      path: expertModule.modules.list.path,
      loadChildren: () => import('./expert/list/console-expert-list.module').then(mod => mod.ConsoleExpertListModule),
    },
    {
      path: expertModule.modules.create.path,
      loadChildren: () => import('./expert/edit/console-expert-edit.module').then(mod => mod.ConsoleExpertEditModule),
    },
    {
      path: expertModule.modules.view.path + expertModule.modules.view.params,
      loadChildren: () => import('./expert/view/console-expert-view.module').then(mod => mod.ConsoleExpertViewModule),
    },
    {
      path: expertModule.modules.update.path + expertModule.modules.update.params,
      loadChildren: () => import('./expert/edit/console-expert-edit.module').then(mod => mod.ConsoleExpertEditModule),
    },]
};
//#endregion

//#region task
const taskModule = modules.task;
const taskRoutes: Route = {
  path: taskModule.path,
  children: [
    {
      path: taskModule.modules.list.path,
      loadChildren: () => import('./task/list/console-task-list.module').then(mod => mod.ConsoleTaskListModule),
    },
    {
      path: taskModule.modules.create.path,
      loadChildren: () => import('./task/edit/console-task-edit.module').then(mod => mod.ConsoleTaskEditModule),
    },
    {
      path: taskModule.modules.update.path + taskModule.modules.update.params,
      loadChildren: () => import('./task/edit/console-task-edit.module').then(mod => mod.ConsoleTaskEditModule),
    },
    {
      path: taskModule.modules.view.path + taskModule.modules.view.params,
      loadChildren: () => import('./task/view/console-task-view.module').then(mod => mod.ConsoleTaskViewModule),
    },
  ]
};
//#endregion

//#region group
const groupModule = modules.group;
const groupRoutes: Route = {
  path: groupModule.path,
  children: [
    {
      path: groupModule.modules.list.path,
      loadChildren: () => import('./group/list/console-group-list.module').then(mod => mod.ConsoleGroupListModule),
    },
    {
      path: groupModule.modules.create.path,
      loadChildren: () => import('./group/edit/console-group-edit.module').then(mod => mod.ConsoleGroupEditModule),
    },
    {
      path: groupModule.modules.update.path + groupModule.modules.update.params,
      loadChildren: () => import('./group/edit/console-group-edit.module').then(mod => mod.ConsoleGroupEditModule),
    },
  ]
};
//#endregion

//#region review
const reviewModule = modules.review;
const reviewRoutes: Route = {
  path: reviewModule.path,
  children: [
    {
      path: reviewModule.modules.list.path,
      loadChildren: () => import('./review/list/console-review-list.module').then(mod => mod.ConsoleReviewListModule),
    },
    // {
    //   path: reviewModule.modules.create.path,
    //   loadChildren: () => import('./review/edit/console-review-edit.module').then(mod => mod.ConsoleReviewEditModule),
    // },
    {
      path: reviewModule.modules.update.path + reviewModule.modules.update.params,
      loadChildren: () => import('./review/edit/console-review-edit.module').then(mod => mod.ConsoleReviewEditModule),
    },
    {
      path: reviewModule.modules.view.path + reviewModule.modules.view.params,
      loadChildren: () => import('./review/view/console-review-view.module').then(mod => mod.ConsoleReviewViewModule),
    },
    {
      path: reviewModule.modules.task.path + reviewModule.modules.task.params,
      loadChildren: () => import('./task/view/console-task-view.module').then(mod => mod.ConsoleTaskViewModule),
    },
    {
      path: reviewModule.modules.statistics.path + reviewModule.modules.statistics.params,
      loadChildren: () => import('./review/statistics/console-review-statistics.module').then(mod => mod.ConsoleReviewStatisticsModule),
    },
  ]
};
//#endregion

//#region share
const shareModule = modules.share;
const shareRoutes: Route = {
  path: shareModule.path,
  children: [
    {
      path: shareModule.modules.index.path,
      loadChildren: () => import('./share/index/console-share-index.module').then(mod => mod.ConsoleShareIndexModule),
    },
  ]
};
//#endregion

//#region invitation
const invitationModule = modules.invitation;
const invitationRoutes: Route = {
  path: invitationModule.path,
  children: [
    {
      path: invitationModule.modules.index.path,
      loadChildren: () => import('./invitation/index/console-invitation-index.module').then(mod => mod.ConsoleInvitationIndexModule),
    },
  ]
};
//#endregion

//#region result
const resultModule = modules.result;
const resultRoutes: Route = {
  path: resultModule.path,
  children: [
    {
      path: resultModule.modules.list.path,
      loadChildren: () => import('./result/list/console-result-list.module').then(mod => mod.ConsoleResultListModule),
    },
    {
      path: resultModule.modules.create.path + resultModule.modules.create.params,
      loadChildren: () => import('./result/edit/console-result-edit.module').then(mod => mod.ConsoleResultEditModule),
    },
    {
      path: resultModule.modules.update.path + resultModule.modules.update.params,
      loadChildren: () => import('./result/edit/console-result-edit.module').then(mod => mod.ConsoleResultEditModule),
    },
    {
      path: resultModule.modules.view.path + resultModule.modules.view.params,
      loadChildren: () => import('./result/view/console-result-view.module').then(mod => mod.ConsoleResultViewModule),
    },
  ]
};
//#endregion

//#region result
const resultTemplateModule = modules.rt;
const resultTemplateRoutes: Route = {
  path: resultTemplateModule.path,
  children: [
    {
      path: resultTemplateModule.modules.list.path,
      loadChildren: () => import('./result/template/list/console-result-template-list.module').then(mod => mod.ConsoleResultTemplateListModule),
    },
    {
      path: resultTemplateModule.modules.create.path,
      loadChildren: () => import('./result/template/edit/console-result-template-edit.module').then(mod => mod.ConsoleResultTemplateEditModule),
    },
    {
      path: resultTemplateModule.modules.update.path + resultTemplateModule.modules.update.params,
      loadChildren: () => import('./result/template/edit/console-result-template-edit.module').then(mod => mod.ConsoleResultTemplateEditModule),
    },
    {
      path: resultTemplateModule.modules.view.path + resultTemplateModule.modules.view.params,
      loadChildren: () => import('./result/template/view/console-result-template-view.module').then(mod => mod.ConsoleResultTemplateViewModule),
    },
  ]
};
//#endregion

//#region score
const scoreModule = modules.score;
const scoreRoutes: Route = {
  path: scoreModule.path,
  children: [
    {
      path: scoreModule.modules.index.path,
      loadChildren: () => import('./score/index/console-score-index.module').then(mod => mod.ConsoleScoreIndexModule),
    },
  ]
};
//#endregion

//#region sys
const sysModule = modules.sys;
const sysRoutes: Route = {
  path: sysModule.path,
  children: [
    {
      path: sysModule.modules.index.path,
      loadChildren: () => import('./sys/index/console-sys-index.module').then(mod => mod.ConsoleSysIndexModule),
    },
  ]
};
//#endregion

const routes: Routes = [
  {
    path: '',
    component: ConsoleLayoutComponent,
    children: [
      {
        path: '',
        component: ConsoleDashboardIndexComponent
      },
      {
        path: console.default,
        component: ConsoleDashboardIndexComponent
      },
      orgRoutes,
      expertRoutes,
      taskRoutes,
      groupRoutes,
      reviewRoutes,
      shareRoutes,
      invitationRoutes,
      resultRoutes,
      resultTemplateRoutes,
      scoreRoutes,
      sysRoutes
    ]
  },
];

// console.log('routes:', routes)

export const ConsoleLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
