import { Component, OnInit } from '@angular/core';

import { AppBaseComponent } from '@app/app-base.component';
import { ResultTemplate, ResultTemplateFormControl } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, PassportService, ResultTemplateService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-result-template-edit',
  templateUrl: './console-result-template-edit.component.html',
  styleUrls: ['./console-result-template-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleResultTemplateEditComponent extends AppBaseComponent implements OnInit {

  template: ResultTemplate = new ResultTemplate();

  controls: ResultTemplateFormControl[] = [];

  msg: string;

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    private resultTemplateService: ResultTemplateService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getInfo();
  }

  addControl(): void {
    const index = this.controls.length;
    const ctrl = new ResultTemplateFormControl();
    ctrl.index = index;
    this.controls.push(ctrl);
  }

  save(): void {
    const verified = this.controls.filter(ctrl => !ctrl.name || !ctrl.type);
    if (verified.length > 0) {
      this.msg = '请填写控件名称或选择控件类型';
      return;
    }
    this.msg = '';

    this.template.controls = JSON.stringify(this.controls);

    this.resultTemplateService.createAndUpdate(this.template, (code: number) => {
      this.appCommonService.openSnackBar(code, this.template.id ? '编辑' : '新建', () => {
        if (code > 0) {
          this.back();
        }
        // if (!this.template.id) {
        //   this.template = new ResultTemplate();
        // }

      });
    });
  }

  getInfo(): void {
    if (this.id) {
      this.resultTemplateService.read(this.id, (template: ResultTemplate) => {
        this.template = template;
        console.log(this.template)
        this.controls = this.template.controls as ResultTemplateFormControl[];
      });
    }
  }

}
