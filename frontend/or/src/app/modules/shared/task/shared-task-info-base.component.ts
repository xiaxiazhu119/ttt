import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FinanceTypeEnum, RoleEnum, StatusEnum, SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Sys, SysSearch, Task, User, UserFinance, UserPassport, UserProfile, UserView } from '@app/shared/models/app.model';
import { AppCommonService, AppEnumService, OrganizationService, PassportService, SysService, TaskService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';
import { SharedBaseInfoBaseComponent } from '../../shared-base-info.component';

export class SharedTaskInfoBaseComponent extends SharedBaseInfoBaseComponent implements OnInit {

  task: Task = new Task();

  constructor(
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    // public appEnumService: AppEnumService,
    public taskService: TaskService,
  ) {
    super(appCommonService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();

  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  getInfo(): void {
    this.taskService.read(this.id, (task: Task) => {
      // console.log(task)
      this.task = task;
      // this.task.levyDateRange = [new Date(this.task.levyStartDate), new Date(this.task.levyEndDate)];
      // this.task.reviewDateRange = [new Date(this.task.reviewStartDate), new Date(this.task.reviewEndDate)];
      // this.task.taskModeName = this.appEnumService.getTaskModeName(this.task.taskMode);
      // this.task.scopeName = this.appEnumService.getLevyScopeName(this.task.scope);
      // this.task.reviewModeName = this.appEnumService.getReviewModeName(this.task.reviewMode);
      this.onInfoGot(this.task);
      this.dataLoaded.emit(this.task);
    });
  }

}
