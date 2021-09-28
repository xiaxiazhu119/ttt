import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-share-index',
  templateUrl: './console-share-index.component.html',
  styleUrls: ['./console-share-index.component.scss']
})
export class ConsoleShareIndexComponent extends AppBaseComponent implements OnInit {

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
