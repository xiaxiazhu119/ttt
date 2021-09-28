import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, Router } from '@angular/router';

import { appConfig } from '@app/shared/config/app.config';

const appRouteConfig = appConfig.routes;
const modules = appRouteConfig.modules;

const appRoutes: Routes = [
  { path: appRouteConfig._default.path, redirectTo: appRouteConfig._default.redirectTo, pathMatch: appRouteConfig._default.pathMatch },
  {
    path: modules.web.path,
    loadChildren: () => import('./components/web/web-layout.module').then(mod => mod.WebLayoutModule),
  }, {
    path: modules.passport.path,
    loadChildren: () => import('./components/passport/passport-layout.module').then(mod => mod.PassportLayoutModule),
  }, {
    path: modules.console.path,
    loadChildren: () => import('./components/console/console-layout.module').then(mod => mod.ConsoleLayoutModule),
  }
];

// console.log(appRoutes)


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    // enableTracing: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
