
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieModule } from 'ngx-cookie';
import { NgProgressModule } from 'ngx-progressbar';

import {

  // XNgLibsLoadingCubeFoldingModule, XNgLibsLoadingCubeGridModule, XNgLibsLoadingRotateModule, XNgLibsLoadingSpinnerModule,

  XNgLibsAjaxBaseService,
  XNgLibsAjaxService,
  XNgLibsCookieService, XNgLibsEventAnnounceService, XNgLibsRouteService,
  XNgLibsUtilitiesService, XNgLibsCryptoJsService,
  XNgLibsModelTransferService,
  XNgLibsFormVerifyService,
  XNgLibsMatSnackbarModule, XNgLibsMatSnackBarService,
  // XNgLibsSwiperService,
  XNgLibsCanDeactivateGuardService,
  // XNgLibsBMapService,

  XNgLibsPipeModule,

  XNgLibsDialogModule,
  XNgLibsDatetimePickerModule,

  XNgLibsDialogComponent

} from 'x-ng-libs';

import {
  AppCommonService, AppEnumService, AppConfigService, AppCookieService, AppAjaxService, PassportService,
  UserService, OrganizationService, TaskService, ResultService, SysService, UserGroupService, ScoreItemService, ScoreTemplateService, ReviewService, ResultTemplateService
} from '@app/shared/services/app-bundle.service';
// import { AppSharedDatetimePickerModule } from '@app/shared/components/datetime-picker/app-shared-datetime-picker.module';
// import { AppSharedDialogComponent } from './shared/components/dialog/app-shared-dialog.component';

// import { HeaderModule } from './components/shared/header/header.module';
// import { FooterModule } from './components/shared/footer/footer.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDirectiveModule } from './shared/directives/directive.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    // SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, HttpClientJsonpModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),

    NgProgressModule,

    MatButtonModule,

    AppRoutingModule,
    // FlexLayoutModule,

    // XNgLibsLoadingCubeFoldingModule, XNgLibsLoadingCubeGridModule, XNgLibsLoadingRotateModule, XNgLibsLoadingSpinnerModule,

    XNgLibsPipeModule.forRoot(),

    XNgLibsDatetimePickerModule,
    XNgLibsDialogModule.forRoot(),
    XNgLibsMatSnackbarModule.forRoot(),

    AppDirectiveModule.forRoot()
  ],
  providers: [

    XNgLibsAjaxBaseService,
    XNgLibsAjaxService,
    XNgLibsEventAnnounceService,
    XNgLibsRouteService,
    XNgLibsUtilitiesService, XNgLibsCryptoJsService,
    XNgLibsCookieService,
    XNgLibsModelTransferService,
    XNgLibsFormVerifyService,
    // XNgLibsSwiperService,
    XNgLibsCanDeactivateGuardService,

    AppEnumService,
    AppConfigService,
    AppAjaxService,
    AppCommonService,
    AppCookieService,

    PassportService,

    UserService,
    UserGroupService,
    OrganizationService,
    TaskService,
    ResultService, ResultTemplateService,
    ScoreItemService, ScoreTemplateService,
    ReviewService,
    SysService,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [XNgLibsDialogComponent],
  exports: []
  // exports: [SafeHtmlPipe]
})
export class AppModule { }
