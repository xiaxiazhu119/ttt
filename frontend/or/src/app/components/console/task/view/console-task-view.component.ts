import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { ResultView, Task, User, UserGroupRelation } from '@app/shared/models/app.model';
import { AppConfigService, PassportService, ResultService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-task-view',
  templateUrl: './console-task-view.component.html',
  styleUrls: ['./console-task-view.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleTaskViewComponent extends AppBaseComponent implements OnInit {

  roleEnum = RoleEnum;

  btnTxt: string;

  task: Task = new Task();
  groupUsers: UserGroupRelation[] = [];
  results: ResultView[];
  isLeader: boolean;

  reviewChecked: boolean = false;

  private resultId: number;

  constructor(
    public routeService: XNgLibsRouteService,
    private cryptoService: XNgLibsCryptoJsService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    private resultService: ResultService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onTaskLoaded(e: any): void {
    this.task = e;
    this.checkSubmitted();
  }

  onGroupUsersLoaded(e: any): void {
    this.groupUsers = e;
    this.isLeader = this.groupUsers.filter(u => u.userId === this.user.id && u.isLeader).length > 0;
  }

  onResultLoaded(e: any): void {
    this.results = e;
    // console.log(this.results)
    if (this.user.role === RoleEnum.Expert) {
      this.reviewChecked = false;
      const rids = this.results.map(rv => (rv.resultId));
      // console.log(rids)
      this.resultService.checkResultReviewed(rids, this.user.id, (data: KeyValuePair[]) => {
        if (data.length > 0) {
          data.map(kvp => {
            const rs = this.results.filter(result => result.resultId === kvp.value);
            if (rs.length > 0) {
              rs[0].reviewId = kvp.key;
            }
          });
        }
        this.reviewChecked = true;
      });
    }
  }

  goToResult(): void {
    if (this.task.userSubmitted) {
      this.goToViewResult(this.resultId);
    } else {
      this.goToCreateResult(this.task.id);
    }
  }

  onReviewClicked(result: ResultView): void {
    // console.log('onReviewClicked - result:', result)
    const q = Object.assign({}, result);
    q.contents = undefined;
    this.routeService.routerNavigate(['/console/review/update', result.reviewId || 0, result.resultId, this.task.id], { q: this.cryptoService.encryptByAES(q) });
  }

  onViewClicked(result: ResultView): void {
    // console.log('onReviewClicked - result:', result)
    if (result.reviewId) {
      const q = Object.assign({}, result);
      q.contents = undefined;
      this.routeService.routerNavigate(['/console/review/view', result.reviewId, result.resultId, this.task.id], { q: this.cryptoService.encryptByAES(q) });
    } else {
      this.routeService.routerNavigate(['/console/result/view', result.resultId]);
    }
  }

  onStatisticsClicked(result: ResultView): void {
    this.routeService.routerNavigate(['/console/review/statistics', result.resultId, this.task.id], { q: this.cryptoService.encryptByAES(this.groupUsers) });
  }

  private goToCreateResult(e: any): void {
    this.routeService.routerNavigate(['/console/result/create', 0, e]);
  }

  private goToViewResult(e: any): void {
    this.routeService.routerNavigate(['/console/result/view', e]);
  }

  private checkSubmitted(): void {

    if (this.user.role === RoleEnum.Normal && this.id) {
      this.resultService.checkSubmittedByUserId(this.user.id, (data: KeyValuePair[]) => {

        const t = setInterval(() => {
          if (this.task.id) {
            clearInterval(t);

            if (data.length > 0) {
              const exists = data.filter(kvp => kvp.value === this.task.id);
              if (exists.length > 0) {
                this.task.userSubmitted = true;
                // this.btnTxt = '查看成果';
                this.resultId = exists[0].key;
              }
            }

            this.btnTxt = this.task.userSubmitted ? '查看成果' : this.task.inLevying ? '提交成果' : '';
          }
        }, 500);


      });
    }
  }

}
