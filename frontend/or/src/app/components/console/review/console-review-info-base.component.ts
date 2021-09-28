import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { ResultView, Review, ScoreItem } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, ReviewService } from '@app/shared/services/app-bundle.service';
import { XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';

export class ConsoleReviewInfoBaseComponent extends AppBaseComponent implements OnInit {

  taskId: number;
  resultId: number;
  result: ResultView;

  review: Review = new Review();

  scoreItems: ScoreItem[];

  constructor(
    public routeService: XNgLibsRouteService,
    public cryptoService: XNgLibsCryptoJsService,
    public appCommonService: AppCommonService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    public reviewService: ReviewService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultId = Number(this.routeService.getParam('rid')) || 0;
    this.taskId = Number(this.routeService.getParam('tid')) || 0;
    this.routeService.getObservableQueryParams().subscribe(params => {
      const q = params.q;
      this.result = JSON.parse(this.cryptoService.decryptByAES(q)) || new ResultView();
      // console.log(this.result)
    });
    this.getInfo();
  }

  onScoreItemsLoaded(e: ScoreItem[]): void {
    this.scoreItems = e;
  }

  getInfo(): void {
    const callback = (review: Review) => {
      if (review) {
        this.review = review;
        // console.log(this.review)
        const scores = JSON.parse(this.review.scores);
        const t = setInterval(() => {
          if (this.scoreItems && this.scoreItems.length > 0) {
            clearInterval(t);
            this.scoreItems.map(si => {
              const s = scores.filter(s => s.id === si.id);
              if (s.length > 0) {
                si.value = s[0].value;
              }
            });
          }
        }, 500);
      }
    };
    console.log('this.id, this.resultId:', this.id, this.resultId)
    if (this.id) {
      this.reviewService.read(this.id, callback);
    }
    // if (!this.id) {
    //   if (this.resultId) {
    //     this.reviewService.readByResultIdAndUserId(this.resultId, this.user.id, callback);
    //   }
    // } else {
    //   this.reviewService.read(this.id, callback);
    // }
    // if(this.resultId)
  }

}
