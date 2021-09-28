import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { KeyValuePair, XNgLibsFormVerifyService, Validate, PropType, MimeType, XNgLibsMatSnackBarService, XNgLibsRouteService } from 'x-ng-libs';
import { FormControlEnum } from '@app/shared/enums/app.enum';
import { Result, ResultTemplateFormControl, Task } from '@app/shared/models/app.model';
import { AppCommonService, AppEnumService, PassportService, ResultService, TaskService } from '@app/shared/services/app-bundle.service';
import { SharedResultInfoBaseComponent } from '../shared-result-info-base.component';

@Component({
  selector: 'app-shared-result-edit',
  templateUrl: './shared-result-edit.component.html',
  styleUrls: ['./shared-result-edit.component.scss']
})
export class SharedResultEditComponent extends SharedResultInfoBaseComponent implements OnInit {

  @Input()
  taskId: number;

  imageMimeType = MimeType.images;

  private task: Task;

  constructor(
    private routeService: XNgLibsRouteService,
    public appCommonService: AppCommonService,
    private appEnumService: AppEnumService,
    public passportService: PassportService,
    private taskService: TaskService,
    public resultService: ResultService,
  ) {
    super(appCommonService, passportService, resultService);
  }

  ngOnInit() {
    super.ngOnInit();
    // console.log(this.taskId)
    this.getTaskInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.id, this.task)
    super.ngOnChanges(changes);
  }

  onFileUploaded(e: any, item: any): void {
    console.log(e)
    item.value = e;
  }

  submit(): void {

    let errCtrl: any;
    for (const ctrl of this.controls) {
      if (ctrl.required && !ctrl.value) {
        errCtrl = ctrl;
        break;
      }
    }

    if (errCtrl) {
      this.msg = '请完善 ' + errCtrl.name + ' 内容';
      return;
    }
    this.msg = '';

    // if (!this.result.id) {
    //   this.task.status = StatusEnum.Normal;
    // }
    if (!this.result.id) {
      this.result.taskId = this.taskId;
      this.result.userId = this.user.id;
    }

    this.result.contents = JSON.stringify(this.controls);

    console.log(this.result)

    this.resultService.createAndUpdate(this.result, (code: number) => {
      this.appCommonService.openSnackBar(code, this.result.id ? '编辑' : '新建', () => {
        // if (!this.result.id) {
        //   this.result = new Result();
        // }
        this.routeService.goBack();
      });
    });

  }

  private getTaskInfo(): void {
    if (this.taskId) {
      this.taskService.read(this.taskId, (task: Task) => {
        this.task = task;
        this.controls = JSON.parse(this.task.resultTemplate.controls.toString());
        this.controls.map(ctrl => {
          if (ctrl.type === FormControlEnum.Url) {
            if (!ctrl.value) {
              ctrl.value = {
                key: '',
                value: ''
              };
            }
          }
        })
      });
    }
  }

}
