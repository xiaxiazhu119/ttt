import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { ResultSearch } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-result-list',
  templateUrl: './console-result-list.component.html',
  styleUrls: ['./console-result-list.component.scss']
})
export class ConsoleResultListComponent extends AppBaseComponent implements OnInit {

  sc: ResultSearch = new ResultSearch();

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
