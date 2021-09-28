import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-result-template-view',
  templateUrl: './console-result-template-view.component.html',
  styleUrls: ['./console-result-template-view.component.scss']
})
export class ConsoleResultTemplateViewComponent extends AppBaseComponent implements OnInit {

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


}
