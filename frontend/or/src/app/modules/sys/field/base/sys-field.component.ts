import { Component, OnInit } from '@angular/core';
import { SysDictTypeEnum } from '@app/shared/enums/app.enum';
import { Sys, SysSearch } from '@app/shared/models/app.model';
import { SysService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';

@Component({
  selector: 'app-sys-field',
  templateUrl: './sys-field.component.html',
  styleUrls: ['./sys-field.component.scss']
})
export class SysFieldComponent implements OnInit {

  list: Sys[] = [];

  constructor(
    private dialogService: XNgLibsDialogService,
    private snackbarService: XNgLibsMatSnackBarService,
    private sysService: SysService
  ) { }

  ngOnInit() {

    // this.sysService.deleteSysDict(1)

    this.getList();

  }

  onFormSubmitted(): void {
    this.getList();
  }

  delete(item: Sys): void {
    this.dialogService.openConfirmDialog('确定要删除该领域吗？', (dialogRef: any) => {
      this.sysService.deleteSysDict(item.id, (code: number = 0) => {
        this.snackbarService.open(code > 0 ? '删除成功' : '删除失败，请稍后再试');
        if (code > 0) {
          this.getList();
        }
        dialogRef.close();
      });
    });
  }

  getList(): void {
    const sc = new SysSearch();
    sc.type = SysDictTypeEnum.Field;
    sc.pageSize = 9999;
    this.sysService.getList(sc, (list: Sys[] = []) => {
      console.log(list);
      this.list = list;
    });
  }

}
