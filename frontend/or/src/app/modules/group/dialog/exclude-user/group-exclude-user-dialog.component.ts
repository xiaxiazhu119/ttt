import { Component, OnInit, Input } from '@angular/core';
import { AppEnumService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCustomDialogBaseComponent, KeyValuePair, XNgLibsUtilitiesService, XNgLibsDialogService, KeyValuePairActivated } from 'x-ng-libs';

@Component({
  selector: 'app-group-exclude-user-dialog',
  templateUrl: './group-exclude-user-dialog.component.html',
  styleUrls: ['./group-exclude-user-dialog.component.scss']
})
export class GroupExcludeUserDialogComponent extends XNgLibsCustomDialogBaseComponent implements OnInit {

  selected: boolean = false;
  submitted: boolean = false;

  // private excludeUsers: KeyValuePairActivated[] = [];
  private selectedUsers: KeyValuePairActivated[] = [];

  constructor(
    private utilitiesService: XNgLibsUtilitiesService,
    private dialogService: XNgLibsDialogService,
    private appEnumService: AppEnumService,
  ) {
    super();
  }

  ngOnInit() {
  }

  onExcludeUsersLoaded(e: any): void {
    // this.excludeUsers = e;
  }

  onUserChange(e: any): void {
    this.selectedUsers = e.selectedUsers;
    this.selected = this.selectedUsers.length > 0;
  }

  confirm(): void {
    this.submitted = true;
    this.emitData = {
      selectedUsers: this.selectedUsers,
      submitted: this.submitted
    };
    super.confirm();
  }

}
