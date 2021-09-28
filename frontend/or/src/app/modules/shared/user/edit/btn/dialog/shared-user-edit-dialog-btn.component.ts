import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { SharedUserEditDialogComponent } from '../../dialog/shared-user-edit-dialog.component';
import { SharedUserEditBtnBaseComponent } from '../shared-user-edit-btn-base.component';

@Component({
  selector: 'app-shared-user-edit-dialog-btn',
  template: `
    <button *ngIf="useBtn" mat-raised-button color="primary" (click)="showEditFormDialog()" title="{{btnTxt}}">{{btnTxt}}</button>
    <button *ngIf="!useBtn" mat-button color="primary" (click)="showEditFormDialog()" title="{{btnTxt}}">{{btnTxt}}</button>
  `,
  // styleUrls: ['./shared-user-edit-dialog-btn.component.scss']
})
export class SharedUserEditDialogBtnComponent extends SharedUserEditBtnBaseComponent implements OnInit {

  constructor(
    private dialogService: XNgLibsDialogService,

  ) {

    super();

  }

  ngOnInit() {
    super.ngOnInit();
    // const btnStyle = this.useBtn ? 'mat-raised-button' : 'mat-button';
    // this.renderer.setAttribute(this.editBtn._elementRef.nativeElement, btnStyle, '');
  }

  showEditFormDialog(): void {
    // console.log(this.mobile)
    // this.xService.updateAssessmentLogById(this.log, (resp: any) => { });
    // return;
    this.dialogService
      .openCustomDialog<SharedUserEditDialogComponent>({
        orgId: this.orgId
      }, SharedUserEditDialogComponent, (dialogRef, e, data) => {
        console.log(e, data)
        if (e) {
          this.onSubmit(e);
          dialogRef.close();
        }
      });
  }

}
