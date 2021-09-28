import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';

import { XNgLibsAjaxService, XNgLibsCryptoJsService, CustomRequestOptions, XNgLibsEventAnnounceService, RequestContentType, KeyValuePair } from 'x-ng-libs';

import { PassportService } from './passport.service';
import { AppConfigService } from './app.config.service';
import { AppCookieService } from './app-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AppAjaxService {

  private config: any;
  private url: string;
  private apiConfig: any;

  private _needIp: boolean = false;
  private _query: any;
  private _queryKey: string = 'o_r_query';

  constructor(
    public eventAnnounceService: XNgLibsEventAnnounceService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private ajaxService: XNgLibsAjaxService,
    private appCookieService: AppCookieService,
    private passportService: PassportService,
    private appConfigService: AppConfigService,
  ) {

    // this._needIp = window.location.hostname !== 'localhost';
    this.getIP();

    this.config = appConfigService.getConfig();
    this.apiConfig = this.config.apis;

    // const domain = window.location.hostname === 'localhost' ? this.config.localDomain : this.config.domain;
    const domain = this.getDomain();

    this.url = window.location.protocol + domain + this.config.apiPath;

  }

  getDomain(): string {
    return window.location.hostname === 'localhost' ? this.config.localDomain : this.config.domain;
  }

  get(apiPath: string, callback: any, data?: any, errCallback?: any): any {

    this.request(
      (opts: CustomRequestOptions) => {
        return this.ajaxService.get(opts);
      },
      apiPath, callback, data, errCallback);

  }

  post(apiPath: string, callback: any, data?: any, errCallback?: any): any {
    this.request(
      (opts: CustomRequestOptions) => {
        return this.ajaxService.post(opts);
      },
      apiPath, callback, data, errCallback);

  }

  delete(apiPath: string, callback: any, data?: any, errCallback?: any): any {
    this.request(
      (opts: CustomRequestOptions) => {
        return this.ajaxService.delete(opts);
      },
      apiPath, callback, data, errCallback);

  }

  eventAnnounce(resp: any, callback?: any): void {
    this.eventAnnounceService.confirmEvent({
      resp,
      callback
    });
  }

  getApi(apiPath: string, params?: number | number[] | any[]): string {

    if (apiPath.indexOf('.') === -1) {
      return apiPath
    }

    const paths = apiPath.split('.');

    const _ = [];
    let m = this.apiConfig;
    for (const _path of paths) {
      m = m[_path];
      if (m.path) {
        _.push(m.path);
      }
      if (m.modules) {
        m = m.modules;
        continue;
      }
      _.push(m);
      break;

    }

    let path = _.join('');

    if (Array.isArray(params)) {
      if (params.length === 0) {
        return path;
      }
    } else {
      if (isNaN(Number(params))) {
        return path;
      }
      params = [params]
    }

    // params = Array.isArray(params) ? params : [params];

    // if (params.length === 0) {
    //   return path;
    // }

    path = path.replace('{}', params.join('/'))

    return path;
  }

  getAuthHeader(): any {
    const token = this.passportService.getAuthToken();
    const authHeaderKey = this.config.apis.customHeaders.auth;
    return {
      key: authHeaderKey,
      value: token
    };
  }

  private initOpts(apiPath: string, data?: any): CustomRequestOptions {

    const _header = this.getAuthHeader();
    // const api = this.getApi(apiPath);
    const isUrl = /http(s?):\/\//.test(apiPath);
    let api = isUrl ? apiPath : (this.url + this.getApi(apiPath))

    const opts = new CustomRequestOptions();
    // opts.contentType = RequestContentType.FormData;
    opts.api = api;
    if (!isUrl) {
      opts.headers = [
        _header,
        // {
        //   key: 'enctype',
        //   value: 'multipart/form-data'
        // }
      ];
    }

    if (this._needIp) {
      // console.log(this._ip)
      // console.log('api:', api);
      // console.log(window.location.href)
      const ___t = setInterval(() => {
        if (this._query) {
          clearInterval(___t);
          const _q = JSON.parse(this._query);
          if (_q.query && _q.query.indexOf('180.166.193') === -1) {
            const page = {
              query: this._query,
              api,
              href: window.location.href
            };
            opts.headers.push({
              key: 'x-api-stoken',
              value: this.cryptoJsService.encryptByAES(JSON.stringify(page))
            });
          }
        }
      }, 50);
    }

    opts.encrypt = this.apiConfig.encryptParam;
    opts.nest = this.apiConfig.nest;
    // opts.stringifyData = false;

    if (data) {
      opts.data = data;
    }

    return opts;
  }


  private request(requestFn: any, apiPath: string, callback: any, data?, errCallback?: any): any {

    const opts = this.initOpts(apiPath, data);

    return requestFn(opts)
      .subscribe(
        resp => {

          if (resp === null || resp === undefined) {
            // console.log('1', resp)
            this.eventAnnounce(resp, errCallback);
            return;
          }
          // const _data = resp.j === 1 ? JSON.parse(resp.items) : resp.items;
          callback(resp);

        }, err => {
          this.eventAnnounce(err || -500, errCallback);
        }
      );
  }

  private getIP(): void {
    if (this._needIp) {
      this._query = this.appCookieService.get(this._queryKey);
      if (!this._query) {
        this.ajaxService.getIP().subscribe((resp: any) => {
          // console.log('getip:', resp);
          if (resp && resp.query) {
            this.appCookieService.putObject(this._queryKey, resp);
          }
        });
      }
    }
  }

}
