import { Component, EventEmitter, OnInit, Input, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { UserSearch, UserView } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, UserService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsPaginationConfig } from 'x-ng-libs';
import { SharedBaseListComponent } from '../../../shared-base-list.component';

@Component({
  selector: 'app-shared-user-list',
  templateUrl: './shared-user-list.component.html',
  styleUrls: ['./shared-user-list.component.scss']
})
export class SharedUserListComponent extends SharedBaseListComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  @Input()
  orgId: number;
  @Input()
  newUserId: number;
  @Input()
  role: RoleEnum;

  isOrgUserList: boolean = false;

  private dp: string;

  constructor(
    private dialogService: XNgLibsDialogService,
    public appCommonService: AppCommonService,
    private appConfigService: AppConfigService,
    private userService: UserService
  ) {
    super(appCommonService);
    this.dp = appConfigService.getConfig().site.defaultPwd;
    this.sc = new UserSearch();
  }

  ngOnInit() {
    super.ngOnInit();

    console.log('org id:', this.orgId)
    this.isOrgUserList = typeof this.orgId !== 'undefined';
    // this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);

    if (this.newUserId || this.sc) {
      this.getList();
    }
  }

  switchRole() {
    this.trigger.openMenu();
  }

  // del(id: number): void {
  //   this.appCommonService.openConfirmDialogAndSnackBar('确定要删除该用户吗？', (callback: any) => {
  //     this.userService.delete(id, (code: number = 0) => {
  //       if (callback) {
  //         callback(code);
  //       }
  //       if (code > 0) {
  //         this.getList();
  //       }
  //     });
  //   }, '删除');
  // }

  delete(id: number): void {
    this.onDelete('确定要删除该用户吗？', (callback) => {
      this.userService.delete(id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        callback(code);
      });
    });
  }

  resetPwd(id: number): void {
    this.appCommonService.openConfirmDialogAndSnackBar('确定要重置该用户的密码吗？', (callback: any) => {
      this.userService.resetPwd(id, (code: number = 0) => {
        if (callback) {
          callback(code);
        }
      });
    }, '重置密码', ['操作成功，密码已重置为' + this.dp, '操作失败，或者该用户密码已经为初始密码']);
  }

  switch(e: any, id: number): void {
    // console.log(e.checked)
    this.userService.switch(id, e.checked, (code: number = 0) => {
      this.appCommonService.openSnackBar(code, '状态切换', () => {
        this.getList();
      });
    });
  }

  getList(): void {
    this.dataLoading = true;
    if (typeof this.orgId !== 'undefined') {
      this.sc.orgId = this.orgId;
    }
    this.sc.role = this.role || 0;
    // this.sc.pageSize = 999;
    // console.log('org user sc:', this.sc)
    this.userService.getList(this.sc, (list: UserView[] = [], total: number = 0) => {
      super.getListComplete(list, total);
      // this.list = list;
      // this.pgCfg.totalItems = total;
      // // console.log(list)
      // this.dataLoading = false;
    });

  }

}
