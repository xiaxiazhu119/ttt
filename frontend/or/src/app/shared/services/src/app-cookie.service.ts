import { Injectable } from '@angular/core';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { XNgLibsCookieService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService extends XNgLibsCookieService {

  constructor(
    public cookieService: CookieService,
    private appConfigService: AppConfigService
  ) {

    super(cookieService);

    const config = this.appConfigService.getConfig();
    this.cookieKeyPrefix += config.projName + '_';

  }

}
