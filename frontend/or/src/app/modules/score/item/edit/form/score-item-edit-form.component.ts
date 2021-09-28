import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ScoreItem } from '@app/shared/models/app.model';
import { AppCommonService, OrganizationService, PassportService, ScoreItemService, SysService, UserService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair, KeyValuePairActivated, XNgLibsCryptoJsService, XNgLibsDialogService, XNgLibsRouteService, XNgLibsUtilitiesService } from 'x-ng-libs';

import { SharedBaseInfoBaseComponent } from '../../../../shared-base-info.component';

@Component({
  selector: 'app-score-item-edit-form',
  templateUrl: './score-item-edit-form.component.html',
  styleUrls: ['./score-item-edit-form.component.scss']
})
export class ScoreItemEditFormComponent extends SharedBaseInfoBaseComponent implements OnInit {

  @Input()
  item: ScoreItem;
  @Input()
  pageTitle: string;
  @Output()
  formSubmitted = new EventEmitter<any>();
  @Output()
  cancelled = new EventEmitter<any>();

  // roleEnum = RoleEnum;
  createMode = true;
  // item: ScoreItem = new ScoreItem()

  constructor(
    private utilitiesService: XNgLibsUtilitiesService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    private scoreItemService: ScoreItemService,
  ) {

    super(appCommonService, passportService);
    // console.log('shared user edit form user cookie:', this.user)
  }

  ngOnInit() {
    super.ngOnInit();
    // this.item = this.item || new ScoreItem();
    this.pageTitle = this.standalone ? '' : (!this.item.id ? '新建项目' : '编辑项目');

    super.ngOnInit();

  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // console.log(this.item)
    this.item = this.item || new ScoreItem();
  }

  submit(): void {

    this.scoreItemService.createAndUpdate(this.item, (code: number = 0) => {
      this.submitted = false;
      const prefix = this.id ? '编辑' : '新建';
      this.appCommonService.openSnackBar(code, prefix, () => {
        this.formSubmitted.emit(code);
        if (this.id) {
          this.getInfo();
        } else {
          this.reset();
        }
      });
    });
  }

  cancel(): void {
    this.reset();
    this.cancelled.emit();
  }

  getInfo(): void {
    this.scoreItemService.read(this.id, (item: ScoreItem) => {
      this.item = item;
    });
  }

  private reset(): void {
    this.item = new ScoreItem();
  }

}
