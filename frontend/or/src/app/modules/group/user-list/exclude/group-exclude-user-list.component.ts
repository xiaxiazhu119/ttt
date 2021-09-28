import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { UserGroupService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePairActivated } from 'x-ng-libs';

@Component({
  selector: 'app-group-exclude-user-list',
  templateUrl: './group-exclude-user-list.component.html',
  styleUrls: ['./group-exclude-user-list.component.scss']
})
export class GroupExcludeUserListComponent implements OnInit {

  @Input()
  id: number;
  @Input()
  users: KeyValuePairActivated[];
  // @Output()
  // excludeUsersLoaded = new EventEmitter<any>();
  @Output()
  userChanged = new EventEmitter<any>();

  excludeUsers: KeyValuePairActivated[];

  private selectedUsers: KeyValuePairActivated[] = [];

  constructor(
    private userGroupService: UserGroupService
  ) {
  }

  ngOnInit() {
    this.getExclude();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.getExclude();
  }

  onUserChange(e: any, item: KeyValuePairActivated): void {
    // console.log('on user change:', item, this.users)
    this.filterSelectedUsers();
    this.userChanged.emit({
      selectedUsers: this.selectedUsers
    });
  }

  private getExclude(): void {

    if (this.id) {
      this.userGroupService.getExcludeUsersById(this.id, (users: KeyValuePairActivated[] = []) => {
        this.excludeUsers = users;
        // this.excludeUsersLoaded.emit(this.users);
      });
    }
  }

  private filterSelectedUsers(): void {
    this.selectedUsers = this.excludeUsers.filter((kvpa: KeyValuePairActivated) => kvpa.activated);
    // console.log('filterSelectedUsers:', this.selectedUsers)
  }

}
