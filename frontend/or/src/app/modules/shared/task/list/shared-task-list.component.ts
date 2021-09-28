import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { Task, TaskSearch, User } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, ResultService, TaskService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, XNgLibsRouteService } from 'x-ng-libs';
import { SharedBaseListComponent } from '../../../shared-base-list.component';

@Component({
  selector: 'app-shared-task-list',
  templateUrl: './shared-task-list.component.html',
  styleUrls: ['./shared-task-list.component.scss']
})
export class SharedTaskListComponent extends SharedBaseListComponent implements OnInit {

  sc: TaskSearch = new TaskSearch();

  active: boolean = false;

  currentTask: Task;

  user: User;
  roleEnum = RoleEnum

  constructor(
    public appCommonService: AppCommonService,
    private passportService: PassportService,
    private taskService: TaskService,
    private resultService: ResultService,
  ) {
    super(appCommonService);

    this.user = passportService.getUserCookie();
    this.sc = new TaskSearch();
    switch (this.user.role) {
      case RoleEnum.Normal:
        // this.sc
        this.sc.userId = this.user.id;
        break;
      case RoleEnum.Expert:
        this.sc.userId = this.user.id;
        this.sc.isExpert = true;
        break;
    }
    this.hasCreate = typeof this.hasCreate === 'undefined' ? this.isAdmin : this.hasCreate;
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.sc) {
      this.getList();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);

    if (this.sc) {
      this.getList();
    }
  }


  closeOpMenu(): void {
    this.active = !this.active;
  }

  getList(): void {
    this.dataLoading = true;
    this.taskService.getList(this.sc, (list: Task[] = [], total: number = 0) => {
      // this.list = list;
      // // console.log(this.list)
      // const complete = () => {
      //   this.pgCfg.totalItems = total;
      //   this.dataLoading = false;
      // }
      if (this.user.role === RoleEnum.Normal) {
        this.resultService.checkSubmittedByUserId(this.user.id, (data: KeyValuePair[]) => {
          // console.log('check submitted data:', data)
          if (data.length > 0) {
            data.map(kvp => {
              const ts = list.filter(task => task.id === kvp.value);
              // console.log('check submitted ts:', list)
              if (ts.length > 0) {
                ts[0].userSubmitted = true;
              }
            });
          }
          // complete();
          super.getListComplete(list, total);
        });
      } else {
        // complete();
        super.getListComplete(list, total);
      }
    });
  }

  delete(id: number): void {
    this.onDelete('确认要删除该任务吗？', (callback) => {
      this.taskService.delete(id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        callback(code);
      });
    });
  }

}
