import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { TaskSearch } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-task-list',
  templateUrl: './console-task-list.component.html',
  styleUrls: ['./console-task-list.component.scss']
})
export class ConsoleTaskListComponent extends AppBaseComponent implements OnInit {

  sc: TaskSearch = new TaskSearch();

  isAdmin: boolean = false;

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
  ) {
    super(routeService, appConfigService, passportService);
    this.isAdmin = this.user.role === RoleEnum.Admin || this.user.role === RoleEnum.SA;
    // this.isAdmin = true;
  }

  ngOnInit() {
    super.ngOnInit();
  }


  onCreateClick(): void {
    this.routeService.routerNavigate('/console/task/create');
  }

  onEditClick(id: number): void {
    if (!this.isAdmin) {
      this.onViewClick(id);
      return;
    }
    this.routeService.routerNavigate(['/console/task/update', id]);
  }

  onViewClick(id: number): void {
    this.routeService.routerNavigate(['/console/task/view', id]);
  }

}
