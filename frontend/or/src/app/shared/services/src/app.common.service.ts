import { Injectable } from '@angular/core';

import { XNgLibsAjaxService, CustomRequestOptions, XNgLibsCryptoJsService, XNgLibsUtilitiesService, XNgLibsModelTransferService, KeyValuePair, KeyValuePairActivated, KeyValuePairExtend, XNgLibsMatSnackBarService, OPTION_ALL, XNgLibsDialogService } from 'x-ng-libs';

import { AppAjaxService } from './app-ajax.service';
import { AppConfigService } from './app.config.service';
// import { UserCookie } from '@app/shared/models/app.model';
import { AppCookieService } from './app-cookie.service';
import { RoleEnum, StatusEnum } from '@app/shared/enums/app.enum';
import { AppEnumService } from './app-enum.service';
import { PassportService } from './passport.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {

  private defaultStartYear: number = 2019;
  private defaultYearInterval: number = 5;

  private apiModules: any;
  private path: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private cryptoJsService: XNgLibsCryptoJsService,
    private utilitiesService: XNgLibsUtilitiesService,
    private modelTransferService: XNgLibsModelTransferService,
    private snackbarService: XNgLibsMatSnackBarService,
    private dialogService: XNgLibsDialogService,
    private appCookieService: AppCookieService,
    private ajaxService: AppAjaxService,
    private appConfigService: AppConfigService,
    private appEnumService: AppEnumService,
    private passportService: PassportService
  ) {

    const m: any = appConfigService.getConfig().apis.common;
    this.path = m.path;
    this.apiModules = m.modules;

  }

  isSA(): boolean {
    const user = this.passportService.getUserCookie();
    if (!user.id) {
      return false;
    }
    return user.role === RoleEnum.SA;
  }

  isAdmin(): boolean {
    const user = this.passportService.getUserCookie();
    if (!user.id) {
      return false;
    }
    return user.role === RoleEnum.Admin || user.role === RoleEnum.SA;
  }

  isUser(): boolean {
    const user = this.passportService.getUserCookie();
    if (!user.id) {
      return true;
    }
    return user.role === RoleEnum.Normal;
  }

  // getWindowSize(): string {
  //   const width = window.innerWidth;
  //   if (width <= 576) {
  //     return 'sm';
  //   }
  //   if (width <= 768) {
  //     return 'md';
  //   }
  //   return 'lg';
  // }

  openSnackBar(code: number, prefix: string, onSuccess?: any, endCallback?: any, customMsg?: string[]): any {
    let msg = prefix + (code > 0 ? '成功' : '失败，请稍后再试');
    if (arguments.length === 5) {
      msg = code > 0 ? customMsg[0] : customMsg[1];
    }
    this.snackbarService.open(msg);
    if (code > 0) {
      if (onSuccess) {
        onSuccess();
      }
    }
    if (endCallback) {
      endCallback()
    }
  }

  openConfirmDialog(msg: string, onConfirm?: any): void {
    this.dialogService.openConfirmDialog(msg, (dialogRef: any) => {
      if (onConfirm) {
        onConfirm();
      }
      dialogRef.close();
    });
  }

  openConfirmDialogAndSnackBar(confirmMsg: string, onConfirm: any, snackbarMsgPrefix: string = '操作', customMsg?: string | any[]): any {
    this.dialogService.openConfirmDialog(confirmMsg, (dialogRef: any) => {
      if (onConfirm) {
        onConfirm((code: number) => {
          let successMsg = snackbarMsgPrefix + '成功',
            failedMsg = snackbarMsgPrefix + '失败，请稍后再试';
          // let msg = snackbarMsgPrefix + (code > 0 ? '成功' : '失败，请稍后再试');
          switch (typeof (customMsg)) {
            case 'string':
              successMsg = customMsg;
              break;
            case 'undefined':
              break;
            default:
              if (customMsg.length > 0) {
                successMsg = (customMsg as any[])[0];
              }
              if (customMsg.length > 1) {
                failedMsg = (customMsg as any[])[1];
              }
              break;
          }
          const msg = code > 0 ? successMsg : failedMsg;
          this.snackbarService.open(msg);
        });
      }
      dialogRef.close();
    });
  }


  getApiHost(): string {
    const config = this.appConfigService.getConfig();
    const protocol = config.protocol;
    // const domain = config.domain;
    // const domain = window.location.hostname === 'localhost' ? config.localDomain : config.domain;
    const domain = this.ajaxService.getDomain();
    return protocol + ':' + domain;
  }

  getFileUploadApi(): string {
    const host = this.getApiHost();
    const apiPath = this.appConfigService.getConfig().apiPath;
    return host + apiPath + this.ajaxService.getApi('common.upload.file');
  }

  saveCountdown(time: number): void {
    const key = this.getCountdownCookieKey();
    if (time <= 0) {
      this.clearCountdown();
      this.appCookieService.remove(key);
    } else {
      const ts = new Date().getTime();
      this.appCookieService.put(key, time.toString() + '|' + ts, {
        expires: (new Date()).addDays(1)
      });
    }
  }

  getCountdown(): number {
    const key = this.getCountdownCookieKey();
    const v = this.appCookieService.get(key);
    if (typeof v === 'undefined') {
      return 0;
    }
    const vs = v.split('|'),
      t = Number((vs[0])),
      ts = Number(vs[1]);
    const nts = new Date().getTime();
    const pass = Math.round((nts - ts) / 1000);
    const rest = t - pass;
    this.clearCountdown(rest);
    return rest >= 0 ? rest : 0;
  }

  getImageCaptcha(success: any): any {
    return this.ajaxService.get('common.captcha.image', (resp) => {
      if (resp.data && resp.data.img && resp.data.chars) {
        const img = this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64, ${resp.data.img}`);
        success(img, resp.data.chars);
      }
    });
  }

  getImageCaptchaUrl(): string {
    const config = this.appConfigService.getConfig();
    const protocol = config.protocol;
    const domain = config.domain;
    const apiPath = config.apiPath;
    const path = this.ajaxService.getApi('common.captcha.image');
    return protocol + ':' + domain + apiPath + path;
  }

  saveImageCaptchaChars(chars: string): void {
    const config = this.appConfigService.getCookiesConfig();
    const key = config.keys.imgCaptcha;
    this.appCookieService.put(key, chars);
  }

  verifyImageCaptcha(ipt: string): boolean {
    const config = this.appConfigService.getCookiesConfig();
    const key = config.keys.imgCaptcha;
    const chars = this.appCookieService.get(key).toUpperCase();
    ipt = this.cryptoJsService.encryptByMD5(ipt.toLowerCase());
    return ipt === chars;
  }

  getSmsCaptcha(mobile: string, chars: string, captcha: string, success?: any): any {
    return this.ajaxService.get('common.captcha.sms', (resp) => {
      if (success) {
        success(resp.chars, resp.code, resp.status);
      }
    }, {
      mobile,
      image_chars: chars,
      image_code: captcha
    });
  }

  getDuration(startTime: string | Date, endTime: string | Date): string {
    startTime = typeof startTime === 'string' ? new Date(startTime) : startTime;
    endTime = endTime || startTime;
    endTime = typeof endTime === 'string' ? new Date(endTime) : endTime;
    const ts = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    return this.getDurationSummary(ts, '-');
  }

  getDurationSummary(duration: number, noneSummary?: string): string {
    if (!duration) {
      return noneSummary || '';
    }
    let rest = duration;
    const hours = Math.floor(rest / 3600);
    rest = rest - 3600 * hours;
    const minutes = Math.floor(rest / 60);
    rest = rest - 60 * minutes;
    return `${hours}小时${minutes}分钟${rest}秒`;
  }

  reduceList(list: any[], compareField: string, compareValue: any, keyField = 'id', valueField = 'name'): KeyValuePair[] | KeyValuePairActivated[] | KeyValuePairExtend[] {
    return list.reduce((previous, item) => (item[compareField] === compareValue && previous.push({ key: item[keyField], value: item[valueField] }), previous), []);
  }

  reduceListByFn(list: any[], fn: any, keyField = 'id', valueField = 'name'): KeyValuePair[] | KeyValuePairActivated[] | KeyValuePairExtend[] {
    return list.reduce((previous, item) => (fn(item) && previous.push({ key: item[keyField], value: item[valueField] }), previous), []);
  }

  addEnterEventListener(onEnter: any): void {

    const fcs = document.querySelectorAll('input');
    // console.log(fcs)

    const listener = (e: any) => {
      // console.log(e)
      if (e.keyCode === 13) {
        onEnter();
      }
    };

    fcs.forEach((elem) => {
      elem.addEventListener('keyup', listener);
    });
  }

  private getCommonDataList<T>(apiPath: string, type: new () => T, parentId: number | string, success: any, dataKey = 'data'): any {
    return this.ajaxService.get(apiPath, (resp) => {
      // console.log(data);
      const list = this.modelTransferService.toList<T>(resp[dataKey], type);
      if (success) {
        success(list);
      }
    }, {
      parent_id: parentId
    });
  }

  private getCountdownCookieKey(): string {
    const config = this.appConfigService.getCookiesConfig();
    return config.prefix + config.keys.countdown;
  }

  private clearCountdown(time = 0): void {
    if (time <= 0) {
      const key = this.getCountdownCookieKey();
      this.appCookieService.remove(key);
    }
  }


}
