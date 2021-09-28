import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { ResultTemplateFormControl } from '@app/shared/models/app.model';
import { AppEnumService } from '@app/shared/services/app-bundle.service';
import { KeyValuePair } from 'x-ng-libs';

@Component({
  selector: 'app-shared-form-control-selection-item',
  template: `
  <div class="app-shared-form-control-selection-item container-fluid" [ngClass]="{'sm': isSM}">
    <span class="d-sm-none sm-btn">
      <button mat-mini-fab color="accent" class="sm" (click)="remove()"><i class="material-icons">close</i></button>
    </span>
    <div class="row align-items-baseline">
      <div class="col-5 col-sm-4 col-md-5">
        <mat-form-field class="full-width">
          <mat-label><span class="required strong">*</span>控件名称</mat-label>
          <input matInput type="text" placeholder="控件名称" maxlength="10" autocomplete="off" [(ngModel)]="ctrl.name">
        </mat-form-field>
      </div>
      <!-- <div class="col-4 col-md-3">
        <mat-form-field class="full-width">
          <mat-label><span class="required strong">*</span>描述文字</mat-label>
          <input matInput type="text" placeholder="描述文字" maxlength="10" [(ngModel)]="ctrl.placeholder">
        </mat-form-field>
      </div> -->
      <div class="col-5 col-sm-4 col-md-5">
        <mat-form-field class="full-width">
          <mat-label><span class="required strong">*</span>控件类型</mat-label>
          <mat-select [(ngModel)]="ctrl.type" placeholder="控件类型">
            <mat-option *ngFor="let item of ctrlList" [value]="item.key">{{item.value}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="col-2 col-sm-2 col-md-1 p-0 text-center">
        <!-- <mat-slide-toggle color="primary" [(ngModel)]="ctrl.required"></mat-slide-toggle> -->
        <mat-checkbox color="primary" [(ngModel)]="ctrl.required">必填</mat-checkbox>
      </div>
      <div class="col-sm-2 col-md-1 d-none d-sm-block text-center">
        <button mat-mini-fab color="accent" [ngClass]="{'sm': isSM}" (click)="remove()"><i class="material-icons">close</i></button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./shared-form-control-selection-item.component.scss']
})
export class SharedFormControlSelectionItemComponent extends BaseComponent implements OnInit {

  @Input()
  ctrl: ResultTemplateFormControl;
  @Input()
  controls: ResultTemplateFormControl[];
  // @Output()
  // ctrlRemoved = new EventEmitter<any>();

  ctrlList: KeyValuePair[] = [];

  constructor(
    private appEnumService: AppEnumService,
  ) {
    super();
    this.ctrlList = this.appEnumService.getFormControlList();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  remove(): void {
    // console.log(this.controls)
    this.controls.splice(this.ctrl.index, 1);
    this.controls.map((ctrl: any, i: number) => {
      ctrl.index = i;
    });
    // this.controls = this.controls.reduce((previous, item, index) => (index !== this.ctrl.index && previous.push(item), previous), []);
    // // console.log(this.controls)
    // this.ctrlRemoved.emit(this.controls);
  }

}
