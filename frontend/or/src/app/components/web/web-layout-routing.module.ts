import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { appConfig } from '@app/shared/config/app.config';

import { WebLayoutComponent } from './web-layout.component';

import { WebHomepageIndexComponent } from './homepage/index/web-homepage-index.component';

const appRouteConfig = appConfig.routes;
const modules = appRouteConfig.modules;

const webModules = modules.web;


const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        component: WebHomepageIndexComponent
      },
    ]
  },
];

// console.log('routes:', routes)

export const WebLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
