import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { SharedUserEditBtnBaseComponent } from '../shared-user-edit-btn-base.component';

@Component({
  selector: 'app-shared-user-edit-slide-btn',
  template: `
    <div id="shared-user-edit-form-container" [ngClass]="{'active': active}">
      <app-shared-user-edit-form [orgId]="orgId" (formSubmitted)="onSubmit($event)" (cancelled)="onCancel()"></app-shared-user-edit-form>
    </div>
    <button mat-mini-fab color="primary" type="button" class="create-btn sm" (click)="switchForm()">
      <i class="material-icons">add</i>
    </button>
  `,
  styleUrls: ['./shared-user-edit-slide-btn.component.scss']
})
export class SharedUserEditSlideBtnComponent extends SharedUserEditBtnBaseComponent implements OnInit {

  constructor(
  ) {

    super();

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
