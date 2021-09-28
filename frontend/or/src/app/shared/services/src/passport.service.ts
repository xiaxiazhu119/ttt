import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { XNgLibsCryptoJsService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { User } from '@app/shared/models/app.model';
import { AppCookieService } from './app-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  private userCookieKey: string;
  // private userProfileCookieKey: string;
  private authCookieKey: string;
  private authExpires: number;
  private appConfig: any;

  readonly extAuthorityItemSeparator = '-';
  readonly extAuthorityKVSeparator = '|';

  private readonly _extAuthorityKey = 'ext_a_';

  private user = new Subject<User>();
  private signInPath: string = '/passport/sign-in';

  constructor(
    private routeService: XNgLibsRouteService,
    private appCookieService: AppCookieService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private appConfigService: AppConfigService
  ) {

    this.appConfig = this.appConfigService.getConfig();
    this.userCookieKey = this.appConfig.cookies.keys.user;
    // this.userProfileCookieKey = this.appConfig.cookies.keys.userProfile;
    this.authCookieKey = this.appConfig.cookies.keys.auth;
    this.authExpires = this.appConfig.cookies.authExpires;
  }

  getAuthToken(): string {
    // this.refreshToken();
    // const token = this.appCookieService.get(this.authCookieKey) || '';
    // return token;
    return this.refreshToken();
  }

  setAuthToken(id = 0): string {

    const now = new Date();
    // const ts = now.format('yyyyMMddHHmmssfff');
    const ts = now.getTime().toString();
    // console.log('ts:', ts);
    const aesTs = this.cryptoJsService.encryptByAES(ts);
    const md5Ts = this.cryptoJsService.encryptByMD5(ts);
    // console.log('suffix:', suffix);
    let token = this.cryptoJsService.encryptByAES(ts + '_' + id + '_' + aesTs);
    token = token + '|' + md5Ts;

    // console.log('token:', token);
    // const obj = {
    //   id: 0,
    //   token
    // };
    this.appCookieService.put(this.authCookieKey, token);
    return token;

  }

  generateAuthToken(): string {
    const token = this.getAuthToken();
    if (token) {
      return token;
    }
    return this.setAuthToken();
  }

  signOut(url: string = '/', callback?: any): void {
    this.removeUserCookie();
    if (callback) {
      callback();
    }
    setTimeout(() => {
      this.routeService.routerNavigate(url || '/passport/sign-in');
    }, 1000);
  }

  getUserCookie(): User {
    return this.appCookieService.getObject(this.userCookieKey) as User || new User();
  }

  // getUserProfileCookie(): UserProfile {
  //   return this.appCookieService.getObject(this.userProfileCookieKey) as UserProfile || new UserProfile();
  // }

  putUserCookie(user: User): void {
    this.appCookieService.putObject(this.userCookieKey, user);
    this.setAuthToken(user.id);
    this.user.next(user);
  }

  // putUserProfileCookie(userProfile: UserProfile): void {
  //   this.appCookieService.putObject(this.userProfileCookieKey, userProfile);
  //   this.userProfile.next(userProfile);
  // }

  removeUserCookie(): void {
    this.appCookieService.remove(this.userCookieKey);
    // this.appCookieService.remove(this.userProfileCookieKey);
    this.appCookieService.remove(this.authCookieKey);
    this.user.next(undefined);
    // this.userProfile.next(undefined);
  }

  // updateUserTokenIdCookie(tokenId: string): void {
  //   const c = this.getUserCookie();
  //   c.tokenId = tokenId;
  //   this.putUserCookie(c);
  // }

  checkSigned(): boolean {
    const user: User = this.getUserCookie();
    return typeof user !== 'undefined';
  }

  checkSignIn(fn: any): void {
    const user = this.getUserCookie();
    if (!user.id) {
      this.routeService.routerNavigateWithRefer([this.signInPath]);
      return;
    }
    fn(user);
    // if (user && user.id > 0 && !user._orgId) { }
  }

  getUserIdFromAuth(): number {
    try {
      const t = this.getAuthToken().split('|');
      const decryptToken = this.cryptoJsService.decryptByAES(t[0]);
      const token = decryptToken.split('_');
      const ts = token[0];
      if (this.cryptoJsService.encryptByAES(ts) !== token[2] || this.cryptoJsService.encryptByMD5(ts) !== t[1]) {
        return 0;
      }
      return Number(token[1]);
    } catch (error) {
      return 0;
    }
    // return this.getUserCookie().id || 0;
  }

  onUserCookieChange(): Subject<User> {
    return this.user;
  }

  // onUserProfileCookieChange(): Subject<UserProfile> {
  //   return this.userProfile;
  // }

  rebuildUser(user: User): User {
    user._ = this.encryptUserData(user);
    return user;
  }

  verifyUser(): boolean {
    const user = this.getUserCookie();
    const _ = user._;
    const __ = this.encryptUserData(user);
    return _ === __;
  }

  private refreshToken(): string {
    const token = this.appCookieService.get(this.authCookieKey) || '';
    const t = token.split('|');
    const decryptToken = this.cryptoJsService.decryptByAES(t[0]);
    const tokens = decryptToken.split('_');
    const ts = tokens[0];
    const userId = Number(tokens[1]) || 0;
    const nowTs = new Date().getTime();
    const diff = nowTs - Number(ts);
    // console.log(ts, nowTs, diff)
    if (diff < (this.authExpires * 1000)) {
      return token;
    }
    return this.setAuthToken(userId);
    // if (this.cryptoJsService.encryptByAES(ts) !== token[2] || this.cryptoJsService.encryptByMD5(ts) !== t[1]) {
    //   return 0;
    // }
  }

  private encryptUserData(user: User): string {
    user._ = '';
    return this.cryptoJsService.encryptByMD5(this.cryptoJsService.encryptByAES(JSON.stringify(user)));
  }


}
