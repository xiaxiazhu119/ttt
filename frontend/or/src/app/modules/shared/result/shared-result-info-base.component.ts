import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FinanceTypeEnum, FormControlEnum, RoleEnum, StatusEnum, SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Result, ResultTemplateFormControl, Sys, SysSearch, Task, User, UserFinance, UserPassport, UserProfile, UserView } from '@app/shared/models/app.model';
import { AppCommonService, AppEnumService, OrganizationService, PassportService, ResultService, SysService, TaskService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';
import { SharedBaseInfoBaseComponent } from '../../shared-base-info.component';

export class SharedResultInfoBaseComponent extends SharedBaseInfoBaseComponent implements OnInit {

  result: Result = new Result();

  formCtrlEnum = FormControlEnum;

  controls: ResultTemplateFormControl[];

  constructor(
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public resultService: ResultService,
    // public appEnumService: AppEnumService,
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
    this.resultService.read(this.id, (result: Result) => {
      // console.log(result)
      this.result = result;
      this.controls = this.result.contents as ResultTemplateFormControl[];
    });
  }

}
