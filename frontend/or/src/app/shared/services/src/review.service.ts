import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { AppCookieService } from './app-cookie.service';
import { Result, ResultSearch, ResultView, Review, ReviewSearch, ReviewView } from '@app/shared/models/app.model';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  createAndUpdate(review: Review, success?: any): any {
    const path = this.ajaxService.getApi('review.crud', review.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, review);
  }

  readByResultIdAndUserId(resultId: number, userId: number, success: any): any {
    const path = this.ajaxService.getApi('review.crud', [resultId, userId]);
    this.ajaxService.get(path, (resp: any) => {
      this.readCallback(resp, success);
    });

  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('review.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      this.readCallback(resp, success);
    });
  }

  getList(sc: ReviewSearch, success: any): any {
    this.ajaxService.get('review.list', (resp: any) => {
      // this.readCallback(resp, success);
      let list: ReviewView[] = [];
      if (resp.data && resp.data.list && resp.data.list.length > 0) {
        list = this.modelTransferService.toList<ReviewView>(resp.data.list, ReviewView);
        list.map(rv => {
          rv.scores = JSON.parse(rv.scores);
        });
      }
      success(list, resp.data.total);
    }, sc);
  }

  private readCallback(resp: any, success: any): any {
    if (success) {

      let review = new Review();
      if (resp && resp.data) {
        review = this.modelTransferService.toSingle<Review>(resp.data, Review);
      }

      success(review);
    }
  }

  /*

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
*/

}
