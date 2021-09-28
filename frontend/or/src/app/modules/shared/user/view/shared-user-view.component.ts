import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UserPassport } from '@app/shared/models/app.model';
import { AppCommonService, PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { SharedUserInfoBaseComponent } from '../shared-user-info-base.component';

@Component({
  selector: 'app-shared-user-view',
  templateUrl: './shared-user-view.component.html',
  styleUrls: ['./shared-user-view.component.scss']
})
export class SharedUserViewComponent extends SharedUserInfoBaseComponent implements OnInit {

  @Input()
  id: number;

  isSelf: boolean = false;

  constructor(
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public userService: UserService
  ) {
    super(appCommonService, passportService, userService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  onInfoGot(up: UserPassport): void {
    this.isSelf = up.id === this.user.id;
  }

}
