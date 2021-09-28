import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FinanceTypeEnum, RoleEnum, StatusEnum, SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Sys, SysSearch, User, UserFinance, UserPassport, UserProfile, UserView } from '@app/shared/models/app.model';
import { AppCommonService, OrganizationService, PassportService, SysService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';
import { SharedBaseInfoBaseComponent } from '../../shared-base-info.component';

export class SharedUserInfoBaseComponent extends SharedBaseInfoBaseComponent implements OnInit {

  @Input()
  pageTitle: string;
  @Input()
  fullMode = false;
  @Input()
  orgId: number;
  @Input()
  id: number;
  @Input()
  standalone: boolean = false;

  up: UserPassport = new UserPassport();
  profile: UserProfile = new UserProfile();

  user: User;

  orgList: KeyValuePair[] = [];

  fields: KeyValuePairActivated[] = [];
  finances: UserFinance[] = [];

  constructor(
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public userService: UserService
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
    const isSimple = !!this.orgId;
    this.userService.read(this.id, isSimple, (up: UserPassport, profile: UserProfile, userView: UserView, fields: KeyValuePairActivated[] = [], finances: UserFinance[] = []) => {
      // console.log(up, profile, userView, fields, finances);
      this.up = up;
      this.profile = profile;
      this.fields = fields;
      this.finances = finances;
      this.onInfoGot(up);
    });
  }

}
