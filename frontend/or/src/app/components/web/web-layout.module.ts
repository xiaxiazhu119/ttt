import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WebLayoutRoutingModule } from './web-layout-routing.module';
import { WebLayoutComponent } from './web-layout.component';

import { WebFooterModule, WebHeaderModule } from '@app/modules/public-api';

import { WebHomepageIndexModule } from './homepage/index/web-homepage-index.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WebLayoutRoutingModule,
    WebHeaderModule, WebFooterModule,
    WebHomepageIndexModule
  ],
  declarations: [WebLayoutComponent],
  exports: [WebLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebLayoutModule {
}

