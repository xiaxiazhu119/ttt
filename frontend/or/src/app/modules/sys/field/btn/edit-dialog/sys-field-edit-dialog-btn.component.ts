import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { SysFieldEditDialogComponent } from '../../dialog/sys-field-edit-dialog.component';

@Component({
  selector: 'app-sys-field-edit-dialog-btn',
  template: `
  <button *ngIf="!useIconBtn"  mat-raised-button color="primary" (click)="showEditDialog()">新建领域</button>
  <button *ngIf="useIconBtn"  mat-mini-fab color="primary" class="create-btn" (click)="showEditDialog()">
    <i class="material-icons">add</i>
  </button>
  `,
  // styleUrls: ['./sys-field-edit-dialog-btn.component.scss']
})
export class SysFieldEditDialogBtnComponent implements OnInit {

  @Input()
  useIconBtn: boolean = false;

  @Output()
  formSubmitted = new EventEmitter<any>();

  constructor(
    private dialogService: XNgLibsDialogService,
    public snackBarService: XNgLibsMatSnackBarService,
    public passportService: PassportService,
    public userService: UserService,) {
  }

  ngOnInit() {
  }

  showEditDialog(): void {
    // console.log(this.mobile)
    // this.xService.updateAssessmentLogById(this.log, (resp: any) => { });
    // return;
    this.dialogService
      .openCustomDialog<SysFieldEditDialogComponent>({}, SysFieldEditDialogComponent, (dialogRef, e, data) => {
        console.log(e, data)
        if (e) {
          this.formSubmitted.emit(e);
          dialogRef.close();
        }
      });
  }

}
