import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { UserGroup, UserGroupSearch } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, UserGroupService, UserService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-group-list',
  templateUrl: './console-group-list.component.html',
  styleUrls: ['./console-group-list.component.scss']
})
export class ConsoleGroupListComponent extends AppBaseComponent implements OnInit {

  sc: UserGroupSearch = new UserGroupSearch();

  t: any[] = [];

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public userGroupService: UserGroupService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onCreateClick(): void {
    this.goTo('/console/group/create');
  }

  onEditClick(id: number): void {
    this.goTo(['/console/group/update', id]);
  }

}
