import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { UserSearch } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-expert-list',
  templateUrl: './console-expert-list.component.html',
  styleUrls: ['./console-expert-list.component.scss']
})
export class ConsoleExpertListComponent extends AppBaseComponent implements OnInit {

  roleSC = RoleEnum.Expert;

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
    this.goTo('/console/expert/create');
  }

  onEditClick(id: number): void {
    this.goTo(['/console/expert/update', id]);
  }

  onViewClick(id: number): void {
    this.goTo(['/console/expert/view', id]);
  }

}
