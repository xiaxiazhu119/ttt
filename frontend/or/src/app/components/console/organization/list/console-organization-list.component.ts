import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { StatusEnum } from '@app/shared/enums/app.enum';
import { Organization, OrganizationSearch } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, OrganizationService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-organization-list',
  templateUrl: './console-organization-list.component.html',
  styleUrls: ['./console-organization-list.component.scss']
})
export class ConsoleOrganizationListComponent extends AppBaseComponent implements OnInit {

  // sc: OrganizationSearch = new OrganizationSearch();

  constructor(
    public routeService: XNgLibsRouteService,
    public dialogService: XNgLibsDialogService,
    public appConfigService: AppConfigService,
    private appCommonService: AppCommonService,
    public passportService: PassportService,
    private organizationService: OrganizationService
  ) {
    super(routeService, appConfigService, passportService);
    this.sc = new OrganizationSearch();
  }

  ngOnInit() {
    super.ngOnInit();
    this.search();
  }

  goToCreate(): void {
    this.goTo('/console/organization/create');
  }

  goToEdit(item: Organization): void {
    this.goTo(['/console/organization/update', item.id]);
  }

  getList(): void {
    this.organizationService.getList(this.sc, (list: Organization[] = [], total: number = 0) => {
      this.list = list;
      this.pgCfg.totalItems = total;
    });
  }

  onStatusChange(e: any, item: Organization): void {
    // console.log(e)
    const status = e.checked ? StatusEnum.Normal : StatusEnum.Disabled;
    const org = new Organization();
    org.id = item.id;
    org.status = status;
    this.organizationService.createAndUpdate(org, (code: number = 0) => {
      this.getList();
      this.appCommonService.openSnackBar(code, '状态变更')
    });
  }

  delete(item: Organization): void {
    this.appCommonService.openConfirmDialogAndSnackBar('确定要删除该机构吗？', (snackbarCallback?: any) => {
      this.organizationService.delete(item.id, (code: number = 0) => {
        if (code > 0) {
          this.getList();
        }
        if (snackbarCallback) {
          snackbarCallback(code);
        }
      });
    }, '删除');
  }

}
