import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';
import { MatTabGroup } from '@angular/material';
import { Organization } from '@app/shared/models/app.model';

@Component({
  selector: 'app-console-organization-edit',
  templateUrl: './console-organization-edit.component.html',
  styleUrls: ['./console-organization-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleOrganizationEditComponent extends AppBaseComponent implements OnInit {

  @ViewChild('tabGroup', { static: true })
  tabGroup: MatTabGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {

    this.setTabStyle();
  }

  tabChange: any;

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    private renderer: Renderer2
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.setTabStyle();

  }

  onOrgUpdate(e: Organization): void {
    this.id = e.id;
    console.log(this.id)
  }

  setTabStyle() {
    if (window.innerWidth < 992) {
      this.renderer.setAttribute(this.tabGroup._elementRef.nativeElement, "mat-stretch-tabs", '');
    } else {
      this.renderer.removeAttribute(this.tabGroup._elementRef.nativeElement, 'mat-stretch-tabs');
    }

  }

  onSelectedTabChange(e: any): void {
    // console.log(e)
    this.tabChange = e;
  }

}
