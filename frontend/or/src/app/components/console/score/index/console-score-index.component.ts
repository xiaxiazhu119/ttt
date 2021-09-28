import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { AppBaseComponent } from '@app/app-base.component';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-score-index',
  templateUrl: './console-score-index.component.html',
  styleUrls: ['./console-score-index.component.scss']
})
export class ConsoleScoreIndexComponent extends AppBaseComponent implements OnInit {

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
