import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { AppCookieService } from './app-cookie.service';
import { Result, ResultSearch, ResultTemplate, ResultTemplateFormControl, ResultTemplateSearch, ResultView } from '@app/shared/models/app.model';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';

@Injectable({
  providedIn: 'root'
})
export class ResultTemplateService {

  constructor(
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  createAndUpdate(rt: ResultTemplate, success?: any): any {
    const path = this.ajaxService.getApi('result.template.crud', rt.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, rt);
  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('result.template.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {

        let rt = new ResultTemplate();
        if (resp && resp.data) {
          rt = this.modelTransferService.toSingle<ResultTemplate>(resp.data, ResultTemplate);
          rt.controls = JSON.parse(rt.controls.toString());
        }

        success(rt);
      }
    });
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('result.template.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

  getList(sc: ResultTemplateSearch, success: any): any {
    this.ajaxService.get('result.template.list', (resp: any) => {
      if (success) {
        let list: ResultTemplate[] = [];
        if (resp.data && resp.data.list && resp.data.list.length > 0) {
          // resp.data.list.map(data => {
          //   data.contents = JSON.parse(data.contents);
          // });
          list = this.modelTransferService.toList<ResultTemplate>(resp.data.list, ResultTemplate);
        }
        success(list, resp.data.total);
      }
    }, sc)
  }


}
