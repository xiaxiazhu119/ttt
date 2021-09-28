import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { appConfig } from '@app/shared/config/app.config';
import { AppConfigService, PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { User } from '@app/shared/models/app.model';
import { XNgLibsPaginationConfig, XNgLibsRouteService } from 'x-ng-libs';
import { RoleEnum } from './shared/enums/app.enum';
import { BaseComponent } from './base.component';

export class AppBaseComponent extends BaseComponent implements OnInit {

  // isLoading: boolean = true;
  componentLoaded = false;
  h = true;

  user: User;

  ts: number;

  hasBack: boolean = false;
  currentRouteModule: any;
  currentRouteModuleTitle: string;

  showReturnToTop: boolean = false;

  scrollTarget: any;

  id: number;

  isAdmin: boolean = false;
  isSA: boolean = false;

  private routerEventSubscription: any;

  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll($event: any) {
  //   // console.log(window.pageYOffset)
  // }

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
  ) {
    super();
    this.user = this.passportService.getUserCookie();
    this.isAdmin = this.user.role === RoleEnum.Admin || this.user.role === RoleEnum.SA;
    this.isSA = this.user.role === RoleEnum.SA;
    const url = routeService.getLocationPath().split('?')[0];
    this.initCurrentRouteModule(url);

    window.addEventListener('scroll', this.scroll, true); //third parameter

    this.routeService.getObservableParams().subscribe(params => {
      this.id = Number(params.id) || 0;
      // console.log(this.id)
    });
  }

  ngOnInit() {
    // console.log('base ngOnInit');
    this.routerEventSubscribe();
    super.ngOnInit();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    // console.log(event)
    this.scrollTarget = event.target;
    const scrollTop = event.target.scrollTop;
    this.showReturnToTop = scrollTop > 0;
    // console.log(scrollTop)
    //handle your scroll here
    //notice the 'odd' function assignment to a class field
    //this is used to be able to remove the event listener
  };

  back(): void {
    this.routeService.goBack();
  }

  initTS(): void {
    this.ts = new Date().getTime();
  }

  goTo(commands: any, queryParams?: any): void {
    this.routeService.routerNavigate(commands, queryParams);
  }

  onNavigationStart(router: any, event: any): void {
    this.h = true;
    this.componentLoaded = false;
  }
  onNavigationEnd(router: any, event: any): void {
    // console.log(router.url)
    this.initCurrentRouteModule(router.url);
  }
  onNavigationCancel(router: any, event: any): void {
  }

  scrollToTop(): void {
    // (function smoothscroll() {
    //   var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //   console.log(document.documentElement.scrollTop || document.body.scrollTop)
    //   if (currentScroll > 0) {
    //     window.requestAnimationFrame(smoothscroll);
    //     window.scrollTo(0, currentScroll - (currentScroll / 8));
    //   }
    // })();
    // console.log(document.querySelector('#app-container'))
    // document.querySelector('#app-container').scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest"
    // });
    let scrollTop = this.scrollTarget.scrollTop;
    let s = 20;
    const t = 8;
    for (let i = 0; i < t; i++) {
      setTimeout(() => {
        scrollTop /= i + 1;
        // console.log(scrollTop)
        this.scrollTarget.scrollTop = scrollTop;
      }, i * s)
    }
    setTimeout(() => {
      // console.log('a')
      this.scrollTarget.scrollTop = 0;
    }, s * t);
    // console.log(this.scrollTarget)
  }

  private initCurrentRouteModule(url): void {
    this.currentRouteModule = this.appConfigService.getRouterModuleByUrl(url);
    this.currentRouteModuleTitle = this.currentRouteModule.title;
    // console.log(this.currentRouteModuleTitle)
    this.hasBack = this.appConfigService.hasBackBtnForConsole(url);
  }

  private completeComponentLoad(): void {
    if (this.h) {
      this.h = false;
    }
    setTimeout(() => {
      this.componentLoaded = true;
      // console.log('4:',this.componentLoaded)
    }, 500);
  }

  private routerEventSubscribe(): void {

    const onNavigationStart = (router: any, event: any) => {
      this.onNavigationStart(router, event);
      // console.log(this.componentLoaded)
    };

    const onNavigationEnd = (router: any, event: any) => {
      this.onNavigationEnd(router, event);
      this.completeComponentLoad();
    };

    const onNavigationCancel = (router: any, event: any) => {
      this.onNavigationCancel(router, event);
      this.completeComponentLoad();
    };

    this.routerEventSubscription = this.routeService.subscribeRouterEvents(onNavigationStart, onNavigationEnd, onNavigationCancel);

  }

}
