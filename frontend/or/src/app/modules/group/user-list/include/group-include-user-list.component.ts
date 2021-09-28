import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { SharedBaseListComponent } from '@app/modules/shared-base-list.component';
import { UserGroupRelation } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, UserGroupService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-group-include-user-list',
  templateUrl: './group-include-user-list.component.html',
  styleUrls: ['./group-include-user-list.component.scss']
})
export class GroupIncludeUserListComponent extends SharedBaseListComponent implements OnInit {

  @Input()
  groupId: number;
  @Input()
  users: UserGroupRelation[];

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    private userGroupService: UserGroupService,
  ) {
    super(appCommonService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getList();
  }

  switchAuthor(item: UserGroupRelation): void {
    this.userGroupService.switchAuthor(item, (code: number = 0) => {
      this.appCommonService.openSnackBar(code, '设置', () => {
        this.dataChanged.emit();
      });
    });
  }

  delete(item: UserGroupRelation): void {
    this.onDelete('确认要将该成员移除吗？', (callback) => {
      this.userGroupService.removeFromRelation(item.groupId, item.userId, (code: number = 0) => {
        if (code > 0) {
          this.dataChanged.emit();
        }
        callback(code);
      });
    });
    // this.appCommonService.openConfirmDialogAndSnackBar('确认要将该成员移除吗？', (snackbarCallback: any) => {
    //   this.userGroupService.removeFromRelation(item.groupId, item.userId, (code: number = 0) => {
    //     if (code > 0) {
    //       this.dataChanged.emit();
    //     }
    //     snackbarCallback(code);
    //   });
    // });
  }

  getList(): void {
    this.dataLoading = true;
    if (this.groupId && !this.users) {
      this.userGroupService.getRelationUsers(this.groupId, (users: UserGroupRelation[] = []) => {
        this.users = users;
        // super.getListComplete(users);
        this.dataLoading = false;
        this.dataLoaded.emit(this.users);
      });
    }
    this.dataLoading = false;
  }

}
