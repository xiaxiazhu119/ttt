import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-result-edit',
  templateUrl: './console-result-edit.component.html',
  styleUrls: ['./console-result-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleResultEditComponent extends AppBaseComponent implements OnInit {

  taskId: number;

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.taskId = Number(this.routeService.getParam('tid'));
  }

}
