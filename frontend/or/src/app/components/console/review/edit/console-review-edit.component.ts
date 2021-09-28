import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { ResultView, Review, ScoreItem } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, ReviewService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';
import { ConsoleReviewInfoBaseComponent } from '../console-review-info-base.component';

@Component({
  selector: 'app-console-review-edit',
  templateUrl: './console-review-edit.component.html',
  styleUrls: ['./console-review-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleReviewEditComponent extends ConsoleReviewInfoBaseComponent implements OnInit {

  msg: string;

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

  submit(): void {
    // console.log(this.scoreItems)
    const unScored = this.scoreItems.filter(si => typeof si.value === 'undefined').length > 0;
    if (unScored) {
      this.msg = '请为所有评审项目填写分数';
      return;
    }

    if (!this.review.id) {
      this.review.userId = this.user.id;
      this.review.resultId = this.resultId;
    }

    this.review.totalScore = this.scoreItems.map(si => (si.value)).reduce((sum, current) => sum + current);
    this.review.scores = JSON.stringify(this.scoreItems);

    this.submitted = true;
    this.reviewService.createAndUpdate(this.review, (code: number) => {
      this.appCommonService.openSnackBar(code, '评审', () => {
        setTimeout(() => {
          this.back();
        }, 1000);
      }, () => {
        this.submitted = false;
      });
    });

  }

}
