import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-result-template-list',
  templateUrl: './console-result-template-list.component.html',
  styleUrls: ['./console-result-template-list.component.scss']
})
export class ConsoleResultTemplateListComponent extends AppBaseComponent implements OnInit {

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


  onCreateClick(): void {
    this.routeService.routerNavigate('/console/rt/create');
  }

  onEditClick(id: number): void {
    if (!this.isAdmin) {
      this.onViewClick(id);
      return;
    }
    this.routeService.routerNavigate(['/console/rt/update', id]);
  }

  onViewClick(id: number): void {
    this.routeService.routerNavigate(['/console/rt/view', id]);
  }


}
