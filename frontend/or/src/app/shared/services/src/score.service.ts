import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';
import { AppCookieService } from './app-cookie.service';
import { AppAjaxService } from './app-ajax.service';
import { Result, ScoreItem, ScoreItemSearch } from '@app/shared/models/app.model';
import { AppEnumService } from './app-enum.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreItemService {

  constructor(
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  //#region item

  createAndUpdate(item: ScoreItem, success?: any): any {
    const path = this.ajaxService.getApi('score.item.crud', item.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, item);
  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('score.item.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {
        let item = new ScoreItem();
        if (resp && resp.data) {
          item = this.modelTransferService.toSingle<ScoreItem>(resp.data, ScoreItem);
        }
        success(item);
      }
    });
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('score.item.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

  getList(sc: ScoreItemSearch, success: any): any {
    this.ajaxService.get('score.item.list', (resp: any) => {
      const list = this.modelTransferService.toList<ScoreItem>(resp.data.list, ScoreItem);
      success(list);
    }, sc);
  }

  createTaskScoreItemRelation(taskId: number, scoreItemIds: number[], success?: any): any {
    this.ajaxService.post('score.item.taskRelation', (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, {
      taskId,
      scoreItemIds
    });
  }

  //#endregion

}

@Injectable({
  providedIn: 'root'
})
export class ScoreTemplateService {

  constructor(
    private routeService: XNgLibsRouteService,
    private appCookieService: AppCookieService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
  ) {

  }

  //#region item

  createAndUpdate(item: ScoreItem, success?: any): any {
    const path = this.ajaxService.getApi('score.item.crud', item.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, item);
  }

  // deleteSysDict(id: number, success?: any): any {
  //   const path = this.ajaxService.getApi('sys.crud', id || 0);
  //   this.ajaxService.delete(path, (resp: any) => {
  //     success(Number(resp.code));
  //   });
  // }

  getList(sc: ScoreItemSearch, success: any): any {
    this.ajaxService.get('score.item.list', (resp: any) => {
      // console.log(resp)
      success(resp.data.list, resp.data.total);
    }, sc);
  }

  //#endregion

}