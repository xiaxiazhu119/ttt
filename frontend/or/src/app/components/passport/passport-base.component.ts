import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { XNgLibsRouteService, XNgLibsCryptoJsService, KeyValuePair } from 'x-ng-libs';

import { AppCommonService, AppConfigService, AppEnumService, PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { User, UserPassport } from '@app/shared/models/app.model';
import { AppBaseComponent } from '@app/app-base.component';
import { RoleEnum, StatusEnum } from '@app/shared/enums/app.enum';

export class PassportBaseComponent extends AppBaseComponent implements OnInit {

  imageCaptcha: string = '';
  remember = false;
  // msg = '&nbsp;';
  // isOrg = false;
  signInBtnTxt = '登 录';
  smsCaptcha: string;

  up: UserPassport = new UserPassport();

  msg: string;
  pwdHide: boolean = true;

  private space = '&nbsp;';
  private refer: string;

  constructor(
    public cryptoJsService: XNgLibsCryptoJsService,
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public userService: UserService,
  ) {

    super(routeService, appConfigService, passportService);

    this.routeService.getObservableQueryParams().subscribe(params => {
      this.refer = params.refer === '' ? '/' : params.refer;
      // console.log(this.refer)
    });

  }

  ngOnInit(): void {

    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.appCommonService.addEnterEventListener(() => {
      this.submit();
    });
  }

  submit(): void {

  }

  goToSignUp(): void {
    this.routeService.routerNavigate('/passport/sign-up');
  }

  goToSignIn(): void {
    this.routeService.routerNavigate('/passport/sign-in');
  }

  onCaptchaValueChanged(v: string): void {
    // console.log('on captcha value changed:', v)
    const captcha = this.cryptoJsService.encryptByMD5(this.cryptoJsService.encryptByAES(v.toUpperCase()));
    if (captcha === this.up.captchaChars) {
      this.up.captcha = v;
    } else {
      this.up.captcha = '';
    }
  }

  onCaptchaLoaded(e: any): void {
    // console.log('on captcha loaded:', e)
    this.up.captchaChars = e.chars;
  }

  passportVerified(user: User): void {
    this.passportService.putUserCookie(user);
    this.routeService.routerNavigate('/console/dashboard');
  }

  refreshTS(): void {
    this.ts = new Date().getTime();
  }

}
