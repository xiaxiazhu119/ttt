import { Component, OnInit, SimpleChanges } from '@angular/core';
import { LevyScopeEnum, StatusEnum } from '@app/shared/enums/app.enum';
import { ResultTemplate, ScoreItem, Task, User, UserGroup } from '@app/shared/models/app.model';
import { AppCommonService, AppEnumService, PassportService, ScoreItemService, TaskService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair } from 'x-ng-libs';
import { SharedTaskInfoBaseComponent } from '../shared-task-info-base.component';

@Component({
  selector: 'app-shared-task-edit',
  templateUrl: './shared-task-edit.component.html',
  styleUrls: ['./shared-task-edit.component.scss']
})
export class SharedTaskEditComponent extends SharedTaskInfoBaseComponent implements OnInit {

  levyDateBsConfig: any;
  reviewDateBsConfig: any;
  reviewDateDisabled: boolean;

  taskModeList: KeyValuePair[] = [];
  levyScopeList: KeyValuePair[] = [];
  reviewModeList: KeyValuePair[] = [];

  glbttActive: boolean = false;

  // private tmpSelectedGroup: UserGroup;
  private selectedGroups: UserGroup[];
  private selectedScoreItems: ScoreItem[];
  private resultTemplate: ResultTemplate;

  constructor(
    public appCommonService: AppCommonService,
    private appEnumService: AppEnumService,
    public passportService: PassportService,
    public taskService: TaskService,
    public scoreItemService: ScoreItemService,
  ) {
    super(appCommonService, passportService, taskService);
    this.taskModeList = appEnumService.getTaskModeList();
    this.levyScopeList = appEnumService.getLevyScopeList();
    this.reviewModeList = appEnumService.getReviewModeList();

    if (!this.isSA) {
      this.levyDateBsConfig = {
        minDate: new Date(),
      };
      this.reviewDateBsConfig = {
        minDate: new Date(),
      };
    }
  }

  ngOnInit() {
    super.ngOnInit();
    // if (this.task.id) {
    //   this.task.levyDateRange = [new Date(this.task.levyStartDate), new Date(this.task.levyEndDate)];
    //   this.task.reviewDateRange = [new Date(this.task.reviewStartDate), new Date(this.task.reviewEndDate)];
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.id, this.task)
    super.ngOnChanges(changes);
    // console.log(this.id, this.task)
    this.reviewDateDisabled = !this.id;
    // if (this.id) {
    //   console
    //   this.selectedGroup = (this.task.groups as UserGroup[])[0];
    // }
  }

  onLevyDateChange(e: any): void {
    // console.log(e)
    if (e && e.length > 0) {
      const levyMinDate = (new Date((e[1] as Date).getTime())).addDays(1);
      this.task.levyDateRange = e;
      // this.levyMinDate = (new Date((e[1] as Date).getTime())).addDays(1);
      this.reviewDateDisabled = false;
      if (!this.isSA) {
        this.reviewDateBsConfig = {
          minDate: levyMinDate
        };
      }
    }
  }

  onReviewDateChange(e: any): void {
    // console.log(e)
    if (e && e.length > 0) {
      this.task.reviewDateRange = e;
      // this.reviewMinDate = (new Date((e[1] as Date).getTime())).addDays(1);
    }
  }

  onGroupSelect(e: any): void {
    // console.log(e)
    this.selectedGroups = e;
    this.confirmGLBTT();
  }

  closeGLBTT(): void {
    this.glbttActive = false;
  }

  cancelGLBTT(): void {
    this.selectedGroups = [];
    this.glbttActive = false;
  }

  onSlideGroupSelect(e: any): void {
    this.selectedGroups = e;
  }

  confirmGLBTT(): void {
    this.task.groups = Object.assign([], this.selectedGroups);
    this.task.groupNames = this.task.groups.map(g => (g.name)).join(',');
    // this.selectedGroup = Object.assign(new UserGroup(), this.selectedGroup);
    // console.log(this.selectedGroup)
    this.cancelGLBTT();
  }

  onScoreItemChecked(e: ScoreItem[]): void {
    this.selectedScoreItems = e;
  }

  onResultTemplateChanged(e: ResultTemplate[]): void {
    if (e && e.length > 0) {
      this.resultTemplate = e[0];
    }
  }

  submit(): void {
    // console.log(this.task)
    // return;
    if (!this.task.name) {
      this.msg = '请填写任务名称';
      return;
    }
    if (!this.task.levyDateRange) {
      this.msg = '请选择征集日期区间';
      return;
    }
    if (!this.task.reviewDateRange) {
      this.msg = '请选择评审日期区间';
      return;
    }
    // if (!this.task.scope) {
    //   this.msg = '请选择评征集范围';
    //   return;
    // }
    if (!this.task.taskMode) {
      this.msg = '请选择任务模式';
      return;
    }
    if (!this.task.reviewMode) {
      this.msg = '请选择评审模式';
      return;
    }
    if (!this.task.groups || this.task.groups.length === 0) {
      this.msg = '请选择评审组';
      return;
    }
    if (!this.selectedScoreItems || this.selectedScoreItems.length === 0) {
      this.msg = '请选择打分项目';
      return;
    }
    if (!this.resultTemplate) {
      this.msg = '请选择成果模板';
      return;
    }
    this.msg = '';

    this.task.levyStartDate = this.task.levyDateRange[0].format('yyyy-MM-dd');
    this.task.levyEndDate = this.task.levyDateRange[1].format('yyyy-MM-dd');

    this.task.reviewStartDate = this.task.reviewDateRange[0].format('yyyy-MM-dd');
    this.task.reviewEndDate = this.task.reviewDateRange[1].format('yyyy-MM-dd');

    this.task.groupIds = this.task.groups.map(g => (g.id));
    // this.task.scoreItemIds = this.selectedScoreItems.map(si => (si.id));

    if (!this.task.id) {
      this.task.status = StatusEnum.Normal;
      this.task.scope = LevyScopeEnum.Open;
    }

    this.task.resultTemplate = this.resultTemplate;

    console.log(this.task)

    this.taskService.createAndUpdate(this.task, (code: number) => {
      if (code > 0 || this.task.id) {
        this.scoreItemService.createTaskScoreItemRelation(this.task.id || code, this.selectedScoreItems.map(si => (si.id)), (c: number) => {
          code = code || c;
          // console.log(code)
          this.appCommonService.openSnackBar(code, this.task.id ? '编辑' : '新建', () => {
            if (!this.task.id) {
              this.task = new Task();
            } else {
              this.getInfo();
            }
          });
        });
      }
    });
  }

  onInfoGot(data: Task): void {
    this.selectedScoreItems = Object.assign([], data.scoreItems);
    this.resultTemplate = data.resultTemplate;
  }

}
