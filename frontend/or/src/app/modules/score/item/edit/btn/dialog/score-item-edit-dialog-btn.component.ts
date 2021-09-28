import { Component, OnInit } from '@angular/core';
import { XNgLibsDialogService } from 'x-ng-libs';
import { ScoreItemEditDialogComponent } from '../../dialog/score-item-edit-dialog.component';
import { ScoreItemEditBtnBaseComponent } from '../score-item-edit-btn-base.component';

@Component({
  selector: 'app-score-item-edit-dialog-btn',
  template: `
  <button *ngIf="useBtn" mat-raised-button color="primary" (click)="showEditFormDialog()" title="{{btnTxt}}">{{btnTxt}}</button>
  <button *ngIf="!useBtn" mat-button color="primary" (click)="showEditFormDialog()" title="{{btnTxt}}">{{btnTxt}}</button>
  `,
  styleUrls: ['./score-item-edit-dialog-btn.component.scss']
})
export class ScoreItemEditDialogBtnComponent extends ScoreItemEditBtnBaseComponent implements OnInit {

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
    // console.log(this.item)
    // console.log(this.mobile)
    // this.xService.updateAssessmentLogById(this.log, (resp: any) => { });
    // return;
    this.dialogService
      .openCustomDialog<ScoreItemEditDialogComponent>({
        item: this.item
      }, ScoreItemEditDialogComponent, (dialogRef, e, data) => {
        // console.log(e, data)
        if (e) {
          this.onSubmit(e);
          dialogRef.close();
          this.item = undefined;
        }
      }, {
        onCancel: (dialogRef) => {
          this.item = undefined;
          dialogRef.close();
        }
      });
  }

}
