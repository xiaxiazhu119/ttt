import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { ScoreItem, User } from '@app/shared/models/app.model';
import { SharedBaseBtnComponent } from '../../../../shared-base-btn.component';

export class ScoreItemEditBtnBaseComponent extends SharedBaseBtnComponent implements OnInit {

  @Input()
  item: ScoreItem;

  constructor(
  ) {
    super();
  }

  ngOnInit() {
    // const btnStyle = this.useBtn ? 'mat-raised-button' : 'mat-button';
    // this.renderer.setAttribute(this.editBtn._elementRef.nativeElement, btnStyle, '');
  }

}
