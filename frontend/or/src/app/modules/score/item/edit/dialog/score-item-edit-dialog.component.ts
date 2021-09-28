import { Component, OnInit } from '@angular/core';
import { ScoreItem } from '@app/shared/models/app.model';
import { XNgLibsCustomDialogBaseComponent } from 'x-ng-libs';

@Component({
  selector: 'app-score-item-edit-dialog',
  template: `
    <div class="score-item-edit-dialog mat-dialog-container-md">

      <a href="javascript:;" (click)="cancel()" class="close">&times;</a>

      <app-score-item-edit-form [pageTitle]="data.pageTitle" [inDialog]="true" (formSubmitted)="onSubmit($event)" [item]="this.data.item" (cancelled)="cancel()"></app-score-item-edit-form>
    </div>
  `,
  styleUrls: ['./score-item-edit-dialog.component.scss']
})
export class ScoreItemEditDialogComponent extends XNgLibsCustomDialogBaseComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit() {
  }

  onSubmit(code: number): void {
    this.emitData = code;
    super.confirm();
  }

}
