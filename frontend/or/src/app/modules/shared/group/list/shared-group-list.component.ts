import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { UserGroup, UserGroupSearch } from '@app/shared/models/app.model';
import { AppCommonService, UserGroupService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService } from 'x-ng-libs';

import { SharedBaseListComponent } from '../../../shared-base-list.component';

@Component({
  selector: 'app-shared-group-list',
  templateUrl: './shared-group-list.component.html',
  styleUrls: ['./shared-group-list.component.scss']
})
export class SharedGroupListComponent extends SharedBaseListComponent implements OnInit {

  constructor(
    public appCommonService: AppCommonService,
    private userGroupService: UserGroupService,
  ) {
    super(appCommonService);
    this.sc = new UserGroupSearch();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.sc) {
      this.getList();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);
  }

  // onItemChange(e: any, item: UserGroup): void {
  //   console.log(e, item)
  //   item.selected = e.source.checked;
  //   const selectedList = this.list.filter(g => g.selected);
  //   this.selected.emit(selectedList);
  // }

  delete(id: number): void {
    this.onDelete('确认要删除该组吗？', (callback) => {
      this.userGroupService.delete(id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        callback(code);
      });
    });
    // this.appCommonService.openConfirmDialogAndSnackBar('确认要删除该组吗？', (snackbarCallback: any) => {
    //   this.userGroupService.delete(id, (code: number = 0) => {
    //     if (code > 0) {
    //       this.getList();
    //     }
    //     snackbarCallback(code);
    //   });
    // })
  }

  getList(): void {
    this.dataLoading = true;

    this.userGroupService.getList(this.sc, (list: UserGroup[] = [], total: number = 0) => {
      super.getListComplete(list, total);
      // this.list = list;
      // this.pgCfg.totalItems = total;
      // // console.log(list)
      // this.dataLoading = false;
    });

  }

}
