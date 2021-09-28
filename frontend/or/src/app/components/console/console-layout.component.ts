import { Component, OnInit, AfterViewInit, ViewEncapsulation, HostListener } from '@angular/core';

import { XNgLibsRouteService, XNgLibsEventAnnounceService, XNgLibsDialogService } from 'x-ng-libs';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { User } from '@app/shared/models/app.model';
// import { UserCookie } from '@app/shared/models/app.model';

@Component({
  selector: 'app-console-layout',
  templateUrl: './console-layout.component.html',
  styleUrls: ['./console-layout.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class ConsoleLayoutComponent implements OnInit, AfterViewInit {

  hasBack: boolean = false;

  pageTitle: string;

  private user: User;

  constructor(
    public routeService: XNgLibsRouteService,
    public passportService: PassportService,
  ) {
    this.user = passportService.getUserCookie();
    if (!this.user.id) {
      this.passportService.signOut();
      return;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  back() {
    this.routeService.goBack();
  }

  onNavLoad(e: any): void {
    // console.log(e)
    if (e) {
      this.hasBack = e.hasBack || this.hasBack;
      this.pageTitle = e.title || this.pageTitle;
    }
  }


}

