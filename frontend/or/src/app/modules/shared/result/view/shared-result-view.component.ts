import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SharedResultInfoBaseComponent } from '../shared-result-info-base.component';
import { AppCommonService, AppEnumService, PassportService, ResultService } from '@app/shared/services/app-bundle.service';
import { ResultView } from '@app/shared/models/app.model';

@Component({
  selector: 'app-shared-result-view',
  templateUrl: './shared-result-view.component.html',
  styleUrls: ['./shared-result-view.component.scss']
})
export class SharedResultViewComponent extends SharedResultInfoBaseComponent implements OnInit {

  @Input()
  rv: ResultView;

  constructor(
    public appCommonService: AppCommonService,
    private appEnumService: AppEnumService,
    public passportService: PassportService,
    public resultService: ResultService,
  ) {
    super(appCommonService, passportService, resultService);
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
  }

}
