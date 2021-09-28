import { Component, OnInit } from '@angular/core';
import { XNgLibsCustomDialogBaseComponent } from 'x-ng-libs';

@Component({
  selector: 'app-shared-user-edit-dialog',
  template: `
    <div class="shared-user-edit-dialog mat-dialog-container-md">
      <a href="javascript:;" (click)="cancel()" class="close">&times;</a>

      <p>&nbsp;</p>

      <app-shared-user-edit-form [orgId]="data.orgId" [pageTitle]="data.pageTitle" [inDialog]="true" (formSubmitted)="onSubmit($event)" (cancelled)="cancel()"></app-shared-user-edit-form>

    </div>
  `,
  // styleUrls: ['./shared-user-edit-dialog.component.scss']
})
export class SharedUserEditDialogComponent extends XNgLibsCustomDialogBaseComponent implements OnInit {

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
