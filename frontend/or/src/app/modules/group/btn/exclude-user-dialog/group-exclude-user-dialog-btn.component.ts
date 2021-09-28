import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { KeyValuePairActivated, XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { GroupExcludeUserDialogComponent } from '../../dialog/exclude-user/group-exclude-user-dialog.component';

@Component({
  selector: 'app-group-exclude-user-dialog-btn',
  template: `
    <button mat-raised-button color="primary" type="button" (click)="showUserListDialog()">添加成员</button>
  `,
  styleUrls: ['./group-exclude-user-dialog-btn.component.scss']
})
export class GroupExcludeUserDialogBtnComponent implements OnInit {

  @Input()
  id: number;
  @Input()
  users: KeyValuePairActivated[];
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

  showUserListDialog(): void {
    // console.log(this.mobile)
    this.dialogService
      .openCustomDialog<GroupExcludeUserDialogComponent>({
        id: this.id,
        users: this.users
      }, GroupExcludeUserDialogComponent, (dialogRef, e, data) => {
        // console.log(e, data)
        e['dialogRef'] = dialogRef;
        this.dialogConfirmed.emit(e);
      });
  }

}
