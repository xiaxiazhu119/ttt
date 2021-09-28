import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { appConfig } from '@app/shared/config/app.config';
import { AppConfigService, PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { User } from '@app/shared/models/app.model';
import { XNgLibsPaginationConfig, XNgLibsRouteService } from 'x-ng-libs';
import { RoleEnum } from './shared/enums/app.enum';

export class BaseComponent implements OnInit {

  responsiveBreakpoint: any = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 576
  };

  isSM = false;
  windowSize: string;
  ws: number;
  ltLG = false;
  ltMD = false;

  pgCfg: XNgLibsPaginationConfig = {
    currentPage: 1,
    totalItems: 0
  };

  sc: any;
  list: any[] = [];

  // listLoaded: boolean = true;
  dataLoading: boolean = false;
  submitted: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize($event): void {

    this.getWindowSize();
  }

  constructor(
  ) {
    // console.log('constructor - this.pgCfg: ', this.pgCfg)
    this.getWindowSize();
  }

  ngOnInit() {
    // console.log('ngOnInit - this.pgCfg: ', this.pgCfg)
  }


  search(): void {
    // console.log('search:', this.pgCfg, this.pgCfg.currentPage)

    const pageIndex = this.pgCfg.currentPage;
    this.pgCfg.currentPage = 1;
    if (pageIndex === this.pgCfg.currentPage) {
      this.onPageChange(this.pgCfg.currentPage);
    }
  }

  onPageChange(e: any): any {
    // console.log('on page change:', e)
    this.sc.pageIndex = e - 1;
    this.getList();
  }

  getList(): void {
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

  private getWindowSize(): string {
    const width = window.innerWidth;
    this.ws = width;
    // console.log(width)
    this.ltMD = this.ltLG = this.isSM = false;

    if (width >= this.responsiveBreakpoint.lg) {
      this.windowSize = 'lg'
      return;
    }

    if (this.responsiveBreakpoint.md <= width && width < this.responsiveBreakpoint.lg) {
      this.ltLG = true;
      this.windowSize = 'md'
      return;
    }

    if (this.responsiveBreakpoint.sm <= width && width < this.responsiveBreakpoint.md) {
      this.ltMD = this.ltLG = true;
      this.windowSize = 'sm'
      return;
    }

    if (width < this.responsiveBreakpoint.sm) {
      this.isSM = this.ltMD = this.ltLG = true;
      this.windowSize = 'xs';
      return;
    }

  }


}