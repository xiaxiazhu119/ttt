import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { AppCommonService, AppEnumService, PassportService, ResultService, TaskService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair } from 'x-ng-libs';
import { SharedTaskInfoBaseComponent } from '../shared-task-info-base.component';

@Component({
  selector: 'app-shared-task-view',
  templateUrl: './shared-task-view.component.html',
  styleUrls: ['./shared-task-view.component.scss']
})
export class SharedTaskViewComponent extends SharedTaskInfoBaseComponent implements OnInit {

  constructor(
    public appCommonService: AppCommonService,
    private appEnumService: AppEnumService,
    public passportService: PassportService,
    public taskService: TaskService,
    private resultService: ResultService,
  ) {
    super(appCommonService, passportService, taskService);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

}
