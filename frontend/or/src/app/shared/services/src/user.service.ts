import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { KeyValuePair, KeyValuePairActivated, KeyValuePairExtend, XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { User, UserFinance, UserGroup, UserGroupSearch, UserPassport, UserProfile, UserSearch, UserView } from '@app/shared/models/app.model';
import { AppCookieService } from './app-cookie.service';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';
import { StatusEnum } from '@app/shared/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private routeService: XNgLibsRouteService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  signIn(up: UserPassport, success: any): any {
    this.ajaxService.post('user.signIn', (resp: any) => {
      if (success) {
        // success(resp.data);
        let user = undefined;
        if (resp.data) {
          user = this.modelTransferService.toSingle<User>(resp.data, User);
        }
        // console.log(user)
        success(user);
      }
    }, {
      up
    });
  }

  signUp(up: UserPassport, success: any): any {
    this.ajaxService.post('user.signUp', (resp: any) => {
      if (success) {
        success(Number(resp.data));
      }
    }, {
      up
    });
  }

  createAndUpdate(up: UserPassport, p: UserProfile, success: any): any {
    const path = this.ajaxService.getApi('user.crud', up.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    }, {
      up,
      p
    });
  }

  read(id: number, simple: boolean, success: any): any {
    const q = {
      s: simple ? 1 : 0
    };
    const path = this.ajaxService.getApi('user.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {
        let up = new UserPassport();
        let pf = new UserProfile();
        let uv = new UserView();
        let fd: KeyValuePairActivated[] = [];
        let fi: UserFinance[] = [];

        if (resp && resp.data) {
          const user = resp.data.user;
          const fields = resp.data.fields;
          const finances = resp.data.finances;
          if (user) {
            up = this.modelTransferService.toSingle<UserPassport>(user, UserPassport);
            pf = this.modelTransferService.toSingle<UserProfile>(user, UserProfile);
            pf.userId = up.id;
            uv = this.modelTransferService.toSingle<UserView>(user, UserView);
          }
          if (fields && fields.length > 0) {
            fd = fields.map(field => ({
              key: field.id,
              value: field.name,
              activated: !!field.activated
            }));
          }
          if (finances && finances.length > 0) {
            fi = this.modelTransferService.toList<UserFinance>(finances, UserFinance);
          }
        }

        success(up, pf, uv, fd, fi);
      }
    }, q);
  }

  resetPwd(id: number, success: any): any {
    const defaultPwd = this.appConfigService.getConfig().site.defaultPwd;
    const encryptPwd = this.cryptoJsService.encryptByMD5(defaultPwd);
    const up = new UserPassport();
    up.id = id;
    up.pwd = encryptPwd;
    this.createAndUpdate(up, undefined, success);
  }

  switch(id: number, checked: boolean, success: any): any {
    const status = checked ? StatusEnum.Normal : StatusEnum.Disabled;
    const up = new UserPassport();
    up.id = id;
    up.status = status;
    this.createAndUpdate(up, undefined, success);
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('user.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

  getList(sc: UserSearch, success: any): any {
    this.ajaxService.get('user.list', (resp: any) => {
      if (success) {
        let list: UserView[] = [];
        if (resp.data && resp.data.list && resp.data.list.length > 0) {
          resp.data.list.map(data => {
            data['enabled'] = data.status === StatusEnum.Normal;
          });
          list = this.modelTransferService.toList<UserView>(resp.data.list, UserView);
        }
        success(list, resp.data.total);
      }
    }, sc)
  }

  deleteFinance(id: number, success: any): any {
    const path = this.ajaxService.getApi('user.finance.delete', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

}
