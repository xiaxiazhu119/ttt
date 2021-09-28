import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { StatusEnum } from '@app/shared/enums/app.enum';
import { UserGroup, UserGroupRelation } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, UserGroupService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePairActivated, XNgLibsMatSnackBarService, XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-group-edit',
  templateUrl: './console-group-edit.component.html',
  styleUrls: ['./console-group-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleGroupEditComponent extends AppBaseComponent implements OnInit {

  showELT: boolean = false;

  group: UserGroup = new UserGroup();
  users: UserGroupRelation[] = [];

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    private appCommonService: AppCommonService,
    public passportService: PassportService,
    private userGroupService: UserGroupService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.id) {
      this.group.id = this.id;
      this.getInfo();
    }
  }

  submit(): void {
    if (!this.group.name) {
      return;
    }

    this.group.status = this.group.id ? this.group.status : StatusEnum.Normal;

    this.submitted = true;

    this.userGroupService.createAndUpdate(this.group, (code: number) => {
      this.submitted = false;
      this.appCommonService.openSnackBar(code, this.group.id ? '编辑' : '新建');
      this.group.id = this.group.id || code;
    });
  }

  // addMember(): void { }

  onUserSelectConfirm(e: any): void {
    // console.log('onUserSelectConfirm:', e)
    if (e && e.selectedUsers && e.selectedUsers.length > 0) {
      const selectedUsers = e.selectedUsers;
      this.addUsers(selectedUsers, () => {
        if (e.dialogRef) {
          e.dialogRef.close();
          e.submitted = false;
        }
      })
    }
  }

  onDataChanged(e: any): void {
    this.getInfo();
  }

  private addUsers(users: KeyValuePairActivated[], callback: any): void {
    const userIds = users.map((kvpe: KeyValuePairActivated) => (kvpe.key));
    this.userGroupService.createRelation(this.group.id, userIds, (code: number) => {
      this.appCommonService.openSnackBar(code, '添加成员', () => {
        if (callback) {
          callback();
        }
        this.getInfo();
      })
    });

  }

  private getInfo(): void {
    // this.dataLoading = true;
    this.userGroupService.read(this.group.id, (group: UserGroup, users: UserGroupRelation[] = []) => {
      this.group = group;
      this.users = users;
      // this.dataLoading = false;
    })
  }

}
