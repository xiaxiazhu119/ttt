import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { ReviewSearch, ReviewView, UserGroupRelation } from '@app/shared/models/app.model';
import { AppConfigService, PassportService, ResultService, ReviewService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService, XNgLibsCryptoJsService, XNgLibsDialogService } from 'x-ng-libs';

@Component({
  selector: 'app-console-review-statistics',
  templateUrl: './console-review-statistics.component.html',
  styleUrls: ['./console-review-statistics.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleReviewStatisticsComponent extends AppBaseComponent implements OnInit {

  resultId: number;
  taskId: number;

  sc: ReviewSearch = new ReviewSearch();

  active: boolean;
  currentReview: ReviewView = new ReviewView();

  constructor(
    private dialogService: XNgLibsDialogService,
    public routeService: XNgLibsRouteService,
    private cryptoService: XNgLibsCryptoJsService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    private reviewService: ReviewService,
  ) {
    super(routeService, appConfigService, passportService);

    routeService.getObservableQueryParams().subscribe(params => {
      if (!params.q) {
        passportService.signOut();
        return;
      }
      let q: any = this.cryptoService.decryptByAES(params.q);
      if (!q) {
        passportService.signOut();
        return;
      }

      q = JSON.parse(q) as UserGroupRelation[];
      if (!this.isAdmin) {
        if (q.filter(u => u.userId === this.user.id && u.isLeader).length === 0) {
          passportService.signOut();
          return;
        }
      }

    });

  }

  ngOnInit() {
    // console.log(this.id)
    this.resultId = Number(this.routeService.getParam('resultId'));
    this.taskId = Number(this.routeService.getParam('taskId'));

    this.getList();

  }

  getList(): void {
    if (this.resultId && this.taskId) {
      this.dataLoading = true;
      this.sc.resultId = this.resultId;
      this.sc.taskId = this.taskId;
      const userId = this.isAdmin ? 0 : this.user.id;
      this.sc.userId = userId;
      this.sc.pageSize = 9999;
      this.reviewService.getList(this.sc, (list: ReviewView[], total: number) => {
        this.list = list;
        this.dataLoading = false;
      });
    }
  }

  viewInDialog(item: ReviewView): void {
    // console.log(item)
    let scoreList = `<ul>`;
    for (const score of item.scores) {
      // console.log(score);
      scoreList += `  <li>${score.name}: ${score.value}</li>`
    }
    scoreList += '</ul>'
    const createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm:ss');
    const content = `
    <div class="container-fluid">
      <div class="row">
        <label class="col-3 strong pr-0">评审人</label>
        <div class="col-9">${item.name}</div>
      </div>
      <div class="row">
        <label class="col-3 strong pr-0">评分</label>
        <div class="col-9">${scoreList}</div>
      </div>
      <div class="row">
        <label class="col-3 strong pr-0">总分</label>
        <div class="col-9">${item.totalScore}</div>
      </div>
      <div class="row">
        <label class="col-3 strong pr-0">评审意见</label>
        <pre class="col-9">${item.opinion}</pre>
      </div>
      <div class="row">
        <label class="col-3 strong pr-0">评审时间</label>
        <pre class="col-9">${createTime}</pre>
      </div>
    </div>
    `;
    // console.log(content)
    this.dialogService.openDialog({
      title: '评审详情',
      content,
      hasAction: true,
      hasConfirmBtn: false,
      cancelBtnTxt: '关闭',
      crossCancelBtn: true,
      size: 'lg'
    });
  }

  viewInSlide(item: ReviewView): void {
    this.currentReview = Object.assign({}, item);
    this.active = true;
  }

  close(): void {
    this.active = false;
    setTimeout(() => {
      this.currentReview = new ReviewView();
    }, 500);
  }

}
