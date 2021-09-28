import { Component, OnInit } from '@angular/core';
import { SysService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCustomDialogBaseComponent, XNgLibsMatSnackBarService } from 'x-ng-libs';

@Component({
  selector: 'app-sys-field-edit-dialog',
  templateUrl: './sys-field-edit-dialog.component.html',
  styleUrls: ['./sys-field-edit-dialog.component.scss']
})
export class SysFieldEditDialogComponent extends XNgLibsCustomDialogBaseComponent implements OnInit {

  submitted: boolean = false;
  fieldName: string;

  constructor(
    private snackbarService: XNgLibsMatSnackBarService,
    private sysService: SysService
  ) {
    super();
  }

  ngOnInit() {
  }

  submit(): void {
    // this.submitted = true;
    this.sysService.createField(this.fieldName, (code: number) => {
      this.snackbarService.open(code > 0 ? '新建成功' : '新建失败，请稍后再试');
      this.submitted = false;
      if (code > 0) {
        this.fieldName = '';
        this.emitData = code;
        super.confirm();
      }
    });
  }

}
