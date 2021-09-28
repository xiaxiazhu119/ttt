import { Injectable } from '@angular/core';

import { appConfig } from '@app/shared/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() {
  }

  getConfig(): any {
    return appConfig;
  }

  getRoutes(path?: string): any {
    const routes = appConfig.routes;
    if (!path) {
      return routes;
    }
    const paths = path.split('.');
    let modules = routes.modules;
    // console.log(paths, path, modules)
    for (const _path of paths) {
      // console.log(_path, modules[_path])
      const m = modules[_path].modules
      if (m) {
        modules = m;
        continue;
      }
      modules = modules[_path];
      break;
    }
    return modules;
  }

  getResponseConfig(): any {
    return appConfig.response;
  }

  getCookiesConfig(): any {
    return appConfig.cookies;
  }

  getApiDomain(): string {
    return this.getConfig().domain;
  }

  getNoImageAvailable(): string {
    return this.getConfig().site.noImageAvailable;
  }

  getAuthorization(): any {
    return this.getConfig().authorization;
  }

  getRouterModuleByUrl(url: string): any {
    const keys = url.split('?')[0].split('/');
    let routerModule = appConfig.routes;
    // console.log(keys, routerModule)
    keys.map(key => {
      // console.log(key, isNaN(Number(key)))
      if (key !== '' && isNaN(Number(key))) {
        key = key.dashToCamelCase();
        routerModule = routerModule ? routerModule.modules[key] : undefined;
      }
    });
    // console.log(routerModule)
    return routerModule;
  }

  hasBackBtnForConsole(url: string): boolean {
    // console.log('hasBackBtn:', url);
    const regex = new RegExp('\/console\/(dashboard|sys|.*\/(list|index))');
    // console.log(regex.test(url))
    return !regex.test(url);
  }

}
