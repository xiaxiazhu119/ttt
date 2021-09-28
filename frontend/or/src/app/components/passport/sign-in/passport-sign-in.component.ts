import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { XNgLibsRouteService, XNgLibsCryptoJsService, KeyValuePair } from 'x-ng-libs';

import { AppCommonService, AppConfigService, AppEnumService, PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { User, UserPassport } from '@app/shared/models/app.model';
import { RoleEnum, StatusEnum } from '@app/shared/enums/app.enum';
import { PassportBaseComponent } from '../passport-base.component';

@Component({
  selector: 'app-passport-sign-in',
  templateUrl: './passport-sign-in.component.html',
  styleUrls: ['./passport-sign-in.component.scss'],
  providers: [XNgLibsRouteService],
  encapsulation: ViewEncapsulation.None
})
export class PassportSignInComponent extends PassportBaseComponent implements OnInit {

  imageCaptcha: string = '';
  remember = false;
  // msg = '&nbsp;';
  // isOrg = false;
  signInBtnTxt = '登 录';
  smsCaptcha: string;

  up: UserPassport = new UserPassport();

  msg: string;
  pwdHide: boolean = true;

  constructor(
    public cryptoJsService: XNgLibsCryptoJsService,
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    private appEnumService: AppEnumService,
    public userService: UserService,
  ) {

    super(cryptoJsService, routeService, appConfigService, appCommonService, passportService, userService);

  }

  ngOnInit(): void {

    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  submit(): void {
    if (!this.up.userName || !this.up.pwd || !this.up.captcha) {
      return;
    }
    this.up.status = StatusEnum.Normal;
    this.up.pwdEncrypted = this.cryptoJsService.encryptByMD5(this.up.pwd);
    // this.up.pwd = undefined;
    // console.log(this.up)
    // this.routeService.routerNavigate('/console/dashboard')
    const upClone = Object.assign({}, this.up);
    upClone.pwd = undefined;
    this.userService.signIn(upClone, (user: User) => {
      if (!user) {
        this.msg = '用户名或密码错误';
        this.refreshTS();
        return;
      }
      this.passportVerified(user);
      // this.passportService.putUserCookie(user);
      // this.routeService.routerNavigate('/console/dashboard');
    });
  }


}
