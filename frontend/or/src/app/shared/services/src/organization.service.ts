import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { AppCookieService } from './app-cookie.service';
import { AppAjaxService } from './app-ajax.service';
import { Organization, OrganizationSearch } from '@app/shared/models/app.model';
import { AppEnumService } from './app-enum.service';
import { StatusEnum } from '@app/shared/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private routeService: XNgLibsRouteService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  createAndUpdate(org: Organization, success?: any): any {
    const path = this.ajaxService.getApi('org.crud', org.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, org);
  }

  read(id: number, success?: any): any {
    const path = this.ajaxService.getApi('org.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      // console.log(resp)
      success(resp.data);
    });
  }

  delete(id: number, success?: any): any {
    const path = this.ajaxService.getApi('org.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      success(Number(resp.code));
    });
  }

  getList(sc: OrganizationSearch, success: any): any {
    this.ajaxService.get('org.list', (resp: any) => {
      const list: Organization[] = this.modelTransferService.toList<Organization>(resp.data.list, Organization);
      list.map(org => {
        org.enabled = org.status === StatusEnum.Normal;
        org.statusName = this.appEnumService.getStatusName(org.status);
      });
      success(list, resp.data.total);
    }, sc);
  }

  getSimpleList(success: any): any {
    this.ajaxService.get('org.simpleList', (resp: any) => {
      const list: Organization[] = this.modelTransferService.toList<Organization>(resp.data.list, Organization);
      success(list);
    });
  }

}