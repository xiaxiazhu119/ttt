import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

// import { XNgLibsRouteService, XNgLibsEventAnnounceService, XNgLibsDialogService } from 'x-ng-libs';
// import { PassportService, AppConfigService } from '@app/shared/services/app-bundle.service';
// import { BaseLayoutComponent } from '../shared/base-layout.component';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class WebLayoutComponent implements OnInit, AfterViewInit {

  constructor(
    public routeService: XNgLibsRouteService,
    public passportService: PassportService,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }


}


