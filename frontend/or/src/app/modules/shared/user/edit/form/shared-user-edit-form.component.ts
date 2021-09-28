import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FinanceTypeEnum, RoleEnum, StatusEnum, SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Sys, SysSearch, User, UserFinance, UserPassport, UserProfile, UserView } from '@app/shared/models/app.model';
import { AppCommonService, OrganizationService, PassportService, SysService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';
import { SharedUserInfoBaseComponent } from '../../shared-user-info-base.component';

@Component({
  selector: 'app-shared-user-edit-form',
  templateUrl: './shared-user-edit-form.component.html',
  styleUrls: ['./shared-user-edit-form.component.scss'],
  // providers: [XNgLibsRouteService]
})
export class SharedUserEditFormComponent extends SharedUserInfoBaseComponent implements OnInit {

  @Output()
  formSubmitted = new EventEmitter<any>();
  @Output()
  cancelled = new EventEmitter<any>();

  // roleEnum = RoleEnum;
  createMode = true;

  pwdHide: boolean = true;
  confirmPwdHide: boolean = true;
  pwd: string;
  confirmPwd: string;


  constructor(
    private utilitiesService: XNgLibsUtilitiesService,
    private cryptoJsService: XNgLibsCryptoJsService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    private organizationService: OrganizationService,
    private sysService: SysService,
    public userService: UserService
  ) {

    super(appCommonService, passportService, userService);
    // console.log('shared user edit form user cookie:', this.user)
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = this.standalone ? '' : (!this.id ? '新建用户' : '编辑用户');

    if (!this.orgId) {
      if (!this.user.orgId) {
        this.getOrgList();
      }
      this.getFieldList();
    }

    if (this.user.orgId) {
      this.orgList = [{
        key: this.user.orgId,
        value: this.user.orgName
      }];
    }

    super.ngOnInit();

  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  submit(): void {
    if (this.orgId) {
      this.up.role = RoleEnum.Org;
      this.up.roleExt = RoleEnum.Admin;
    } else {
      this.up.role = RoleEnum.Expert;
    }

    if (this.up.userName && this.utilitiesService.isMobile(this.up.userName)) {
      this.profile.mobile = this.up.userName;
    }

    // if (!this.orgId) {
    //   this.up.userName = this.up.userName.indexOf('expert-') === -1 ? ('expert-' + this.up.userName) : this.up.userName;
    //   this.profile.name = this.profile.name.indexOf('expert-') === -1 ? ('expert-' + this.profile.name) : this.profile.name;
    // }

    if (this.user.orgId || this.orgId) {
      this.profile.orgId = this.user.orgId || this.orgId;
    }
    if (this.pwd) {
      this.up.pwd = this.cryptoJsService.encryptByMD5(this.pwd);
    }

    this.up.status = this.id ? this.up.status : StatusEnum.Normal;
    // this.profile.orgId = this.orgId;

    this.profile.fieldIdList = this.fields.filter(field => field.activated).map(field => (field.key));

    this.finances.map(finance => {
      if (!finance.id) {
        finance.status = StatusEnum.Normal;
        finance.type = FinanceTypeEnum.Bank;
      }
    })
    this.profile.finances = this.finances;

    console.log(this.up, this.profile, this.fields, this.finances)

    // this.submitted = true;

    // this.formSubmitted.emit(1);
    // this.submitted = false;
    // return;

    this.userService.createAndUpdate(this.up, this.profile, (code: number = 0) => {
      this.submitted = false;
      const prefix = this.id ? '编辑' : '新建';
      this.appCommonService.openSnackBar(code, prefix, () => {
        this.formSubmitted.emit(code);
        if (this.id) {
          this.getInfo();
        } else {
          this.reset();
        }
      });
    });
  }

  cancel(): void {
    this.reset();
    this.cancelled.emit();
  }

  addFinance(): void {
    const finance = new UserFinance();
    finance.id = 0;
    if (this.up.id) {
      finance.userId = this.up.id;
    }
    this.finances.unshift(finance);
  }

  deleteFinance(id: number, i: number): void {
    const removeFormList = () => {
      this.finances.splice(i, 1);
      // this.finances = this.finances.reduce((previous, item, index) => (index !== i && previous.push(item), previous), []);
    };
    if (id) {
      this.appCommonService.openConfirmDialogAndSnackBar('确认要删除该财务信息吗？', (snackbarCallback?: any) => {
        this.userService.deleteFinance(id, (code: number = 0) => {
          if (code > 0) {
            removeFormList();
          }
          if (snackbarCallback) {
            snackbarCallback(code);
          }
        });
      }, '删除');
    } else {
      removeFormList();
    }
  }

  private reset(): void {
    this.up = new UserPassport();
    this.profile = new UserProfile();
    this.pwd = this.confirmPwd = '';
    this.finances = [];
    this.fields.map(field => field.activated = false);
  }

  private getOrgList(): void {
    this.organizationService.getSimpleList((list: any[]) => {
      this.orgList = list.map(org => ({
        key: org.id,
        value: org.name
      }));
    })
  }

  private getFieldList(): void {
    const sc = new SysSearch();
    sc.type = SysDictTypeEnum.Field;
    sc.pageSize = 9999;
    this.sysService.getList(sc, (list: Sys[] = []) => {
      this.fields = list.map(sys => ({
        key: sys.id,
        value: sys.name
      }));
    });
  }

}
