import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { User, UserPassport, UserProfile } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-expert-view',
  templateUrl: './console-expert-view.component.html',
  styleUrls: ['./console-expert-view.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleExpertViewComponent extends AppBaseComponent implements OnInit {

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
