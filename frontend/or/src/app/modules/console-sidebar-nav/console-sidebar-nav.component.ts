import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { NavItem, User } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { slideLtRAnimation, slideRtLAnimation, XNgLibsEventAnnounceService, XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-sidebar-nav',
  templateUrl: './console-sidebar-nav.component.html',
  styleUrls: ['./console-sidebar-nav.component.scss'],
  animations: [slideLtRAnimation, slideRtLAnimation],
  providers: [XNgLibsRouteService]
})
export class ConsoleSidebarNavComponent implements OnInit {

  @Output()
  navLoaded = new EventEmitter<any>();
  // @Output()
  // pageTitleGot = new EventEmitter<string>();

  navList: NavItem[] = [];
  animationState = false;

  ltLgTitle: string = '专家在线评审系统';

  hasBack: boolean = false;

  private routes: any;
  private authorization: any;
  private user: User;
  private routesConfig: any

  constructor(
    public eventAnnounceService: XNgLibsEventAnnounceService,
    private routeService: XNgLibsRouteService,
    private appConfigService: AppConfigService,
    private passportService: PassportService
  ) {
    this.routes = appConfigService.getRoutes();
    this.routesConfig = this.routes.modules.console;
    this.authorization = appConfigService.getAuthorization();
    this.user = passportService.getUserCookie();
  }

  ngOnInit() {
    this.eventSubscribe();
    this.initNav();
    // this.initActivatedNav();
  }

  goTo(item: NavItem): void {
    this.animationState = false;
    this.navList.map(nav => nav.activated = false);
    item.activated = true;
    this.routeService.routerNavigate(item.link);
  }

  back(): void {
    this.routeService.goBack();
  }

  toggleMenu(): void {
    this.animationState = !this.animationState
  }

  private initNav(): void {

    // console.log('sidebar init nav user:', this.user)
    // this.user.role = RoleEnum.SA;
    // this.user.role = RoleEnum.Org;
    // this.user.roleExt = RoleEnum.Admin;
    if (!this.user || !this.user.role) {
      return;
    }
    const roleScope = this.user.role;
    const role = RoleEnum[roleScope].toLowerCase();
    // console.log('sidebar init nav user:', roleScope, RoleEnum[roleScope], role, this.authorization[role])
    let authorizations = this.authorization[role];
    // console.log('sidebar init nav authorizations:', authorizations)
    if (this.user.roleExt) {
      const roleExt = RoleEnum[this.user.roleExt].toLowerCase();
      authorizations = authorizations[roleExt];
    }

    // const c = [];
    let authKeys: string[] = [];
    let ako: any;

    if (typeof authorizations === 'undefined') {
      ako = this.routesConfig.modules;
    } else {
      ako = authorizations;
      authKeys.push(this.routesConfig.default)
    }

    authKeys = authKeys.concat(Object.keys(ako));
    // console.log('authKeys:', authKeys)

    let modules = this.routesConfig.modules;
    for (const key of authKeys) {
      // console.log('for key:', key)
      const module = modules[key];
      if (typeof module.enabled === 'undefined' || module.enabled) {
        const _default = module.modules[module.default];
        // console.log(module)
        const nav = {
          id: module.id,
          title: module.title,
          icon: module.icon,
          link: this.initLink(['console', module.path, _default.path])
        }
        this.navList.push(nav);
      }
    }

    this.initActivatedNav();

  }

  private initLink(paths: string[]): string {
    return '/' + paths.join('/');
  }

  private initActivatedNav(): void {
    let url = this.routeService.getLocationPath();

    try {
      url = url.split('?')[0];
      this.initLtLgTitle(url);
      const paths = url.split('/');
      const id = 'app-' + paths[1].replace(/_/ig, '') + '-' + paths[2].replace(/_/ig, '');
      let cid = '';
      if (paths.length > 3) {
        cid = id + '-' + paths[3].replace(/_/ig, '');
      }
      // console.log(paths, id)
      this.navList.map(nav => {
        nav.activated = nav.id === id;
        if (nav.childNavList && nav.childNavList.length > 0) {
          nav.childNavList.map(c => {
            c.activated = c.id === cid;
          });
        }
      });
    } catch (error) {

    }
  }

  private initLtLgTitle(url: string): void {
    const module = this.appConfigService.getRouterModuleByUrl(url);
    this.ltLgTitle = module.title;
    this.hasBack = this.appConfigService.hasBackBtnForConsole(url);
    this.emitNavLoaded();
  }

  private eventSubscribe(): void {

    this.eventAnnounceService.eventConfirmed$.subscribe(
      param => {
        // console.log('param:', param);
        if (param) {
          this.ltLgTitle = param.currentRouteModuleTitle;
          this.hasBack = param.hasBack;
          // this.checkBackEnabled(param.url);
          this.emitNavLoaded();
        }
        // this.initLtLgTitle(param.url);
      });

  }

  // private emitPageTitle(): void {
  //   this.pageTitleGot.emit(this.ltLgTitle);
  // }

  private emitNavLoaded(): void {
    this.navLoaded.emit({
      hasBack: this.hasBack,
      title: this.ltLgTitle
    });
  }

}
