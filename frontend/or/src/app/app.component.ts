import { Component, OnInit, HostListener, AfterViewChecked, AfterViewInit, HostBinding, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgProgress, NgProgressComponent } from 'ngx-progressbar';

import { XNgLibsDialogTipsIconConfig, XNgLibsDialogService, XNgLibsEventAnnounceService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { AppBaseComponent } from './app-base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [XNgLibsRouteService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends AppBaseComponent implements OnInit {

  // progressRef: NgProgressRef;
  @ViewChild(NgProgressComponent, { static: true }) progressBar: NgProgressComponent;

  title = 'online-review';
  // componentLoaded = true;
  showProgress = true;

  private hasOpenedDialog = false;
  private rspConfig: any;
  private rspIconConfig: any;
  private errorXNgLibsDialogTipsIconConfig: XNgLibsDialogTipsIconConfig = new XNgLibsDialogTipsIconConfig();
  // private routerEventSubscription: any;

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   // if (this.hasUnsavedData()) {
  //   //   $event.returnValue = true;
  //   // }
  // }

  constructor(
    // private progress: NgProgress,
    public eventAnnounceService: XNgLibsEventAnnounceService,
    public routeService: XNgLibsRouteService,
    private dialogService: XNgLibsDialogService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
    private router: Router,
  ) {

    super(routeService, appConfigService, passportService);

    // this.routerEventSubscribe();
    this.rspConfig = appConfigService.getResponseConfig();
    this.rspIconConfig = this.rspConfig.iconConfig;

    this.passportService.generateAuthToken();

    this.eventSubscribe();
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.initErrorXNgLibsDialogTipsIconConfig();

    this.progressBar.color = '#007bff';

  }


  onNavigationStart(router: any, event: any): void {
    this.showProgress = true;
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.set(40);
    }, 300);
    // console.log(router.url)
    const _isSignOut = router.url.toLowerCase().indexOf('sign-out') !== -1;
    // console.log(router.url, router.url.toLowerCase().indexOf('sign-out') !== -1)
    if (_isSignOut) {
      this.componentLoaded = false;
    }
    super.onNavigationStart(router, event);
  }

  onNavigationEnd(router: any, event: any): void {
    // console.log('navigation end event:', router, event);
    this.onNavigationComplete();
    super.onNavigationEnd(router, event);
    // console.log(this.currentRouteModuleTitle)
    this.announceRouter(router);
  }

  onNavigationCancel(router: any, event: any): void {
    this.onNavigationComplete();
    super.onNavigationCancel(router, event);
  }

  private announceRouter(router?: any, event?: any): void {
    this.eventAnnounceService.confirmEvent({
      router,
      currentRouteModule: this.currentRouteModule,
      currentRouteModuleTitle: this.currentRouteModuleTitle,
      hasBack: this.hasBack
    });

  }

  private onNavigationComplete(): void {
    // this.progressBar.set(100);
    // console.log('1:',this.componentLoaded)
    setTimeout(() => {
      this.progressBar.complete();
      // console.log('2:',this.componentLoaded)
      setTimeout(() => {
        this.showProgress = false;
        // console.log('3:',this.componentLoaded)
      }, 300);
    }, 300);
  }

  private eventSubscribe(): void {

    this.eventAnnounceService.eventConfirmed$.subscribe(
      param => {
        // console.log('param:', param);

        let code = 0;
        let msg = '';

        let resp: any;
        if (param && param.resp) {
          resp = param.resp;
          if (resp) {
            if (resp.code && resp.msg) {
              code = resp.code;
              msg = resp.msg;
            } else {
              // code = -999999;
              msg = '哎呀！服务器开小差了，请稍候再试一下吧。';
            }
          }

          if (code < 0) {

            // this.commonService.componentLoaded();

            const errTips = msg + (code ? ('(' + code + ')') : '');

            if (!this.hasOpenedDialog) {
              this.hasOpenedDialog = true;
              // tipsIconConf.name = 'warning';

              this.dialogService
                // .openTipsDialog(errTips, 'Error')
                .openIconTipsDialog(errTips, this.errorXNgLibsDialogTipsIconConfig)
                .subscribe(rsp => {
                  // console.log(rsp);
                  if (param.callback) {
                    param.callback();
                  }
                  this.hasOpenedDialog = false;
                });

            }

            return;
          }
        }



      });

  }

  private initErrorXNgLibsDialogTipsIconConfig(): void {

    this.errorXNgLibsDialogTipsIconConfig.showIcon = this.rspIconConfig.showIcon;
    this.errorXNgLibsDialogTipsIconConfig.type = this.rspIconConfig.type;
    this.errorXNgLibsDialogTipsIconConfig.cls = this.rspIconConfig.cls;
    const __ec = this.rspIconConfig.configs.error;
    this.errorXNgLibsDialogTipsIconConfig.customCls = __ec.customCls;
    this.errorXNgLibsDialogTipsIconConfig.name = __ec.name;

  }

}

