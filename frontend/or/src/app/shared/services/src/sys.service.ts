import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';
import { AppCookieService } from './app-cookie.service';
import { Sys, SysSearch } from '@app/shared/models/app.model';
import { SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { AppAjaxService } from './app-ajax.service';

@Injectable({
  providedIn: 'root'
})
export class SysService {

  constructor(
    private routeService: XNgLibsRouteService,
    private appCookieService: AppCookieService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
  ) {

  }

  //#region field

  createField(name: string, success?: any): any {
    const sys = new Sys();
    sys.type = SysDictTypeEnum.Field;
    sys.name = name;
    this.createAndUpdateSysDict(sys, success);
  }

  //#endregion

  //#region base

  createAndUpdateSysDict(sys: Sys, success?: any): any {
    const path = this.ajaxService.getApi('sys.crud', sys.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, {
      id: sys.id,
      type: sys.type,
      name: sys.name
    });
  }

  deleteSysDict(id: number, success?: any): any {
    const path = this.ajaxService.getApi('sys.crud', id || 0);
    this.ajaxService.delete(path, (resp: any) => {
      success(Number(resp.code));
    });
  }

  getList(sc: SysSearch, success: any): any {
    this.ajaxService.get('sys.list', (resp: any) => {
      // console.log(resp)
      success(resp.data.list, resp.data.total);
    }, sc);
  }
  //#endregion

}