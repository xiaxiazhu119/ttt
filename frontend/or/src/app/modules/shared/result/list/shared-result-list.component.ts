import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { Result, ResultSearch, User } from '@app/shared/models/app.model';
import { AppConfigService, AppCommonService, PassportService, ResultService } from '@app/shared/services/app-bundle.service';
import { SharedBaseListComponent } from '../../../shared-base-list.component';

@Component({
  selector: 'app-shared-result-list',
  templateUrl: './shared-result-list.component.html',
  styleUrls: ['./shared-result-list.component.scss']
})
export class SharedResultListComponent extends SharedBaseListComponent implements OnInit {

  @Input()
  taskId: number;
  @Input()
  canReview: boolean;
  @Input()
  isLeader: boolean;
  @Output()
  statisticsClicked = new EventEmitter<any>();

  private user: User;

  constructor(
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public resultService: ResultService,
  ) {
    super(appCommonService);
    this.user = passportService.getUserCookie();
    this.sc = new ResultSearch();
    switch (this.user.role) {
      case RoleEnum.Normal:
        this.sc.userId = this.user.id;
        break;
      case RoleEnum.Expert:
        // this.sc.userId = this.user.id;
        // this.sc.isExpert = true;
        break;
    }
    // this.isAdmin = this.user.role === RoleEnum.Admin || this.user.role === RoleEnum.SA;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.standalone) {
      this.getList();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);

    if (this.taskId) {
      this.sc.taskId = this.taskId;
    }
    if (!this.standalone && this.taskId) {
      this.getList();
    }

    // if (this.sc) {
    //   this.getList();
    // }
  }

  goToStatistics(data: any): void {
    this.statisticsClicked.emit(data);
  }


  getList(): void {
    this.dataLoading = true;
    this.resultService.getList(this.sc, (list: Result[] = [], total: number = 0) => {
      super.getListComplete(list, total);
      // this.list = list;
      // console.log(this.list)
      // const complete = () => {
      //   this.dataLoaded.emit(this.list);
      //   this.pgCfg.totalItems = total;
      //   this.dataLoading = false;
      // }
      // complete();
      // if (this.user.role === RoleEnum.Normal) {
      //   this.resultService.checkSubmittedByUserId(this.user.id, (data: KeyValuePair[]) => {
      //     if (data.length > 0) {
      //       data.map(kvp => {
      //         const ts = this.list.filter(task => task.id === kvp.value);
      //         if (ts.length > 0) {
      //           ts[0].userSubmitted = true;
      //         }
      //       });
      //     }
      //     complete();
      //   });
      // } else {
      //   complete();
      // }
    });
  }

}
