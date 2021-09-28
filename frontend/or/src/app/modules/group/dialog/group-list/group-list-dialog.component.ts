import { Component, OnInit } from '@angular/core';
import { UserGroup } from '@app/shared/models/app.model';
import { AppEnumService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCustomDialogBaseComponent, XNgLibsUtilitiesService, XNgLibsDialogService } from 'x-ng-libs';

@Component({
  selector: 'app-group-list-dialog',
  templateUrl: './group-list-dialog.component.html',
  styleUrls: ['./group-list-dialog.component.scss']
})
export class GroupListDialogComponent extends XNgLibsCustomDialogBaseComponent implements OnInit {

  selected: boolean = false;
  // submitted: boolean = false;

  private selectedGroups: UserGroup[];

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

  // onUserChange(e: any): void {
  //   this.selectedUsers = e.selectedUsers;
  //   this.selected = this.selectedUsers.length > 0;
  // }

  onSelected(e: UserGroup[]): void {
    this.selectedGroups = e;
    this.selected = !!e;
  }

  confirm(): void {
    // this.submitted = true;
    this.emitData = this.selectedGroups;
    super.confirm();
  }

}
