import { Component, OnInit } from '@angular/core';
import { SharedBaseListComponent } from '../../../../shared-base-list.component';
import { AppConfigService, AppCommonService, PassportService, ResultService, ResultTemplateService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';
import { ResultTemplate, ResultTemplateSearch } from '@app/shared/models/app.model';

@Component({
  selector: 'app-shared-result-template-list',
  templateUrl: './shared-result-template-list.component.html',
  styleUrls: ['./shared-result-template-list.component.scss']
})
export class SharedResultTemplateListComponent extends SharedBaseListComponent implements OnInit {

  sc: ResultTemplateSearch = new ResultTemplateSearch();

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public resultTemplateService: ResultTemplateService,
  ) {
    super(appCommonService);
  }

  ngOnInit() {
    super.ngOnInit()
    this.getList();
  }

  getList(): void {
    this.dataLoading = true;
    this.sc.pageSize = 9999;
    this.resultTemplateService.getList(this.sc, (list: ResultTemplate[]) => {
      // this.list = list;
      this.getListComplete(list);
    });
  }

  delete(id: number): void {
    // console.log(id)
    this.onDelete('确定要删除该模板吗？', (callback) => {
      this.resultTemplateService.delete(id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        callback(code);
      });
    });
  }


}
