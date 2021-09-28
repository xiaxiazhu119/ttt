import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { AppCookieService } from './app-cookie.service';
import { ResultTemplate, ScoreItem, Task, TaskSearch, UserGroup } from '@app/shared/models/app.model';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  createAndUpdate(task: Task, success?: any): any {
    const path = this.ajaxService.getApi('task.crud', task.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, task);
  }

  getList(sc: TaskSearch, success: any): any {
    this.ajaxService.get('task.list', (resp: any) => {
      if (success) {
        let list: Task[] = [];
        if (resp.data && resp.data.list && resp.data.list.length > 0) {
          // resp.data.list.map(data => {
          //   if (data.leader) {
          //     data['levyStartDate'] = new Date(data.levy_start_date).format('yyyy-MM-dd');
          //     data['levyEndDate'] = new Date(data.levy_end_date).format('yyyy-MM-dd');
          //     // console.log(data)
          //   }
          // });
          list = this.modelTransferService.toList<Task>(resp.data.list, Task);
        }
        success(list, resp.data.total);
      }
    }, sc)
  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('task.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {

        let task = new Task();
        if (resp && resp.data) {
          task = this.modelTransferService.toSingle<Task>(resp.data, Task);
          task.levyDateRange = [new Date(task.levyStartDate), new Date(task.levyEndDate)];
          task.reviewDateRange = [new Date(task.reviewStartDate), new Date(task.reviewEndDate)];
          task.taskModeName = this.appEnumService.getTaskModeName(task.taskMode);
          task.scopeName = this.appEnumService.getLevyScopeName(task.scope);
          task.reviewModeName = this.appEnumService.getReviewModeName(task.reviewMode);
          if (resp.data.groups && resp.data.groups.length > 0) {
            task.groups = this.modelTransferService.toList<UserGroup>(resp.data.groups, UserGroup);
            task.groupId = task.groups[0].id;
            task.groupNames = task.groups.map(g => (g.name)).join(',');
          }
          if (resp.data.scoreItems && resp.data.scoreItems.length > 0) {
            task.scoreItems = this.modelTransferService.toList<ScoreItem>(resp.data.scoreItems, ScoreItem);
          }
          if (resp.data.rt) {
            task.resultTemplate = this.modelTransferService.toSingle<ResultTemplate>(resp.data.rt, ResultTemplate);
            // task.resultTemplate.controls = JSON.parse(task.resultTemplate.controls.toString());
          }
        }

        success(task);
      }
    });
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('task.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }


}
