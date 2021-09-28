import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SharedBaseListComponent } from '../../../../shared-base-list.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { TaskSearch, Task, User, ScoreItem, ScoreItemSearch } from '@app/shared/models/app.model';
import { AppCommonService, PassportService, TaskService, ResultService, ScoreItemService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair } from 'x-ng-libs';

@Component({
  selector: 'app-shared-score-item-list',
  templateUrl: './shared-score-item-list.component.html',
  styleUrls: ['./shared-score-item-list.component.scss']
})
export class SharedScoreItemListComponent extends SharedBaseListComponent implements OnInit {

  @Input()
  newId: number;
  @Input()
  taskId: number;
  @Input()
  hasScoreInput: boolean;
  @Input()
  hasTotalFooter: boolean;
  @Input()
  totalScore?: number;
  @Input()
  scoreInputDisabled: boolean;

  sc = new ScoreItemSearch();

  constructor(
    public appCommonService: AppCommonService,
    private passportService: PassportService,
    private scoreItemService: ScoreItemService,
  ) {
    super(appCommonService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);

    if (this.newId || this.sc) {
      this.getList();
    }
  }

  ngAfterViewInit(): void {

    if (this.hasScoreInput) {
      const t = setInterval(() => {
        const svs = document.querySelectorAll('.score-value');
        // console.log(svs)
        if (svs.length > 0) {
          clearInterval(t)
          svs.forEach((elem: any, key: number, parent: any) => {
            // console.log(elem)
            elem.addEventListener('keyup', this.scoreValueChange, false);
            elem.addEventListener('change', this.scoreValueChange, false);
          });
        }
      }, 500);
    }

  }

  scoreValueChange(event: any): void {
    const svs = document.querySelectorAll('.score-value');
    let totalScore = 0;
    svs.forEach((elem: any, key: number, parent: any) => {
      const min = Number(elem.getAttribute('min'));
      const max = Number(elem.getAttribute('max'));
      let value = elem.value;
      if (value !== '') {
        let value = Number(elem.value) || 0;
        value = value < min ? min : value;
        value = value > max ? max : value;
        // console.log('elem.value:', elem.value, this.totalScore, value);
        elem.value = value;
        totalScore += value;
        // console.log('elem.value:', value, this.totalScore);
      }
    });
    document.querySelector('#total-score').innerHTML = totalScore.toString();
  }

  getList(): void {
    this.dataLoading = true;
    this.sc.pageSize = 9999;
    if (this.taskId) {
      this.sc.taskId = this.taskId;
    }
    this.scoreItemService.getList(this.sc, (list: ScoreItem[]) => {
      super.getListComplete(list);
      // this.list = list;
      // // console.log(this.list)
      // this.dataLoading = false;
      // this.dataLoaded.emit(this.list);
    });
  }

  delete(id: number): void {
    this.onDelete('确认要删除该打分项目吗？', (callback) => {
      this.scoreItemService.delete(id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        callback(code);
      });
    });
  }

}
