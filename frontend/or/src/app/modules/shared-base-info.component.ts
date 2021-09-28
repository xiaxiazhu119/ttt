import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { FinanceTypeEnum, RoleEnum, StatusEnum, SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Sys, SysSearch, User, UserFinance, UserPassport, UserProfile, UserView } from '@app/shared/models/app.model';
import { AppCommonService, OrganizationService, PassportService, SysService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';

export class SharedBaseInfoBaseComponent extends BaseComponent implements OnInit {

  @Input()
  id: number;
  @Input()
  inDialog: boolean = false;
  @Input()
  standalone: boolean = false;
  @Output()
  dataLoaded = new EventEmitter<any>();

  msg: string;

  user: User;
  isAdmin: boolean = false;
  isSA: boolean = false;
  isUser: boolean;

  constructor(
    public appCommonService: AppCommonService,
    public passportService: PassportService,
  ) {
    super();
    this.user = passportService.getUserCookie();
    this.isAdmin = this.appCommonService.isAdmin();
    this.isSA = this.appCommonService.isSA();
    this.isUser = this.appCommonService.isUser();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.id) {
      this.getInfo();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.id)
  }

  onInfoGot(data: any): void { }

  getInfo(): void {
  }

  submit(): void {

  }

}
