import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { ResultView, Review, ScoreItem } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, ReviewService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';
import { ConsoleReviewInfoBaseComponent } from '../console-review-info-base.component';

@Component({
  selector: 'app-console-review-view',
  templateUrl: './console-review-view.component.html',
  styleUrls: ['./console-review-view.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleReviewViewComponent extends ConsoleReviewInfoBaseComponent implements OnInit {

  constructor(
    public routeService: XNgLibsRouteService,
    public cryptoService: XNgLibsCryptoJsService,
    public appCommonService: AppCommonService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    public reviewService: ReviewService,
  ) {
    super(routeService, cryptoService, appCommonService, appConfigService, passportService, reviewService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
