import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { GroupListDialogComponent } from '../../dialog/group-list/group-list-dialog.component';

@Component({
  selector: 'app-group-list-dialog-btn',
  template: `
  <button mat-raised-button color="primary" type="button" (click)="showGroupListDialog()">{{btnTxt}}</button>
  `,
  styleUrls: ['./group-list-dialog-btn.component.scss']
})
export class GroupListDialogBtnComponent implements OnInit {

  @Input()
  btnTxt: string;
  @Output()
  dialogConfirmed = new EventEmitter<any>();

  constructor(
    private dialogService: XNgLibsDialogService,
    private snackBarService: XNgLibsMatSnackBarService,
    public passportService: PassportService,
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.ptt);

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  showGroupListDialog(): void {
    // console.log(this.mobile)
    this.dialogService
      .openCustomDialog<GroupListDialogComponent>({
      }, GroupListDialogComponent, (dialogRef, e, data) => {
        // console.log(e, data)
        // e['dialogRef'] = dialogRef;
        dialogRef.close();
        this.dialogConfirmed.emit(e);
      });
  }

}
