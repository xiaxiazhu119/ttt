import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { AppCookieService } from './app-cookie.service';
import { Result, ResultSearch, ResultView } from '@app/shared/models/app.model';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  createAndUpdate(result: Result, success?: any): any {
    const path = this.ajaxService.getApi('result.crud', result.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, result);
  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('result.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {

        let result = new Result();
        if (resp && resp.data) {
          result = this.modelTransferService.toSingle<Result>(resp.data, Result);
          result.contents = JSON.parse(result.contents.toString());
        }

        success(result);
      }
    });
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('result.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

  getList(sc: ResultSearch, success: any): any {
    this.ajaxService.get('result.list', (resp: any) => {
      if (success) {
        let list: ResultView[] = [];
        if (resp.data && resp.data.list && resp.data.list.length > 0) {
          resp.data.list.map(data => {
            data.contents = JSON.parse(data.contents);
          });
          list = this.modelTransferService.toList<ResultView>(resp.data.list, ResultView);
        }
        success(list, resp.data.total);
      }
    }, sc)
  }

  checkSubmittedByUserId(userId: number, success: any): any {
    const path = this.ajaxService.getApi('result.submitted', userId);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {
        success(resp.data ? resp.data.map(data => ({
          key: data.id,
          value: data.task_id
        })) : []);
      }
    });
  }

  checkResultReviewed(resultIds: number[], userId: number, success: any): any {
    const path = this.ajaxService.getApi('result.reviewed', userId);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {
        success(resp.data ? resp.data.map(data => ({
          key: data.id,
          value: data.result_id
        })) : []);
      }
    }, {
      rids: resultIds.join(',')
    });

  }


}
