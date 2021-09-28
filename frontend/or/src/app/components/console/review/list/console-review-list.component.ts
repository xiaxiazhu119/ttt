import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-review-list',
  templateUrl: './console-review-list.component.html',
  styleUrls: ['./console-review-list.component.scss']
})
export class ConsoleReviewListComponent extends AppBaseComponent implements OnInit {

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onViewClick(id: number): void {
    this.routeService.routerNavigate(['/console/review/task', id]);
  }

  onEditClick(id: number): void {
    if (!this.isAdmin) {
      this.onViewClick(id);
      return;
    }
    this.routeService.routerNavigate(['/console/task/update', id]);
  }

}
