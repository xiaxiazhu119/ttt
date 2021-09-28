import { Component, OnInit } from '@angular/core';

import { REGEX, XNgLibsRouteService, XNgLibsCryptoJsService, XNgLibsUtilitiesService, XNgLibsFormVerifyService, Validate } from 'x-ng-libs';

import { User } from '@app/shared/models/app.model';
import { UserService, PassportService, AppEnumService, AppCommonService, AppConfigService, } from '@app/shared/services/app-bundle.service';
import { FormControl } from '@angular/forms';
import { PassportBaseComponent } from '../passport-base.component';
import { RoleEnum, StatusEnum } from '@app/shared/enums/app.enum';

@Component({
  selector: 'app-passport-sign-up',
  templateUrl: './passport-sign-up.component.html',
  styleUrls: ['./passport-sign-up.component.scss'],
  providers: []
})
export class PassportSignUpComponent extends PassportBaseComponent implements OnInit {

  confirmPwdHide: boolean = true;

  constructor(
    public cryptoJsService: XNgLibsCryptoJsService,
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public appCommonService: AppCommonService,
    public passportService: PassportService,
    public userService: UserService,
  ) {

    super(cryptoJsService, routeService, appConfigService, appCommonService, passportService, userService);

  }

  submit(): void {
    if (!this.up.userName || !this.up.pwd || !this.up.captcha || !this.up.name || this.up.pwd !== this.up.confirmPwd) {
      return;
    }
    this.up.role = RoleEnum.Normal;
    this.up.status = StatusEnum.Normal;
    this.up.pwdEncrypted = this.cryptoJsService.encryptByMD5(this.up.pwd);
    // this.up.pwd = undefined;
    // console.log(this.up)
    // this.routeService.routerNavigate('/console/dashboard')
    const upClone = Object.assign({}, this.up);
    upClone.pwd = upClone.confirmPwd = undefined;
    this.userService.signUp(upClone, (id: number) => {
      if (!id) {
        this.msg = '注册失败，请稍后再试。'
        this.refreshTS();
        return;
      }

      if (id === -1) {
        this.msg = '用户名已存在';
        this.refreshTS();
        return;
      }

      upClone.id = id;
      this.passportVerified(upClone);
      // this.passportService.putUserCookie(upClone);
      // this.routeService.routerNavigate('/console/dashboard');
    });
  }



}
