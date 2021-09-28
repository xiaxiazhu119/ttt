import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsoleDashboardIndexModule } from './dashboard/index/console-dashboard-index.module';

import { ConsoleUserNavModule, ConsoleSidebarNavModule } from '@app/modules/public-api';

import { ConsoleLayoutRoutingModule } from './console-layout-routing.module';
import { ConsoleLayoutComponent } from './console-layout.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ConsoleSidebarNavModule,
    MatButtonModule,
    ConsoleLayoutRoutingModule,
    ConsoleSidebarNavModule,
    ConsoleUserNavModule,
    ConsoleDashboardIndexModule
    // AppWebSharedHeaderModule, AppWebSharedFooterModule, AppWebSharedTopNavModule
  ],
  declarations: [ConsoleLayoutComponent,],
  exports: [ConsoleLayoutComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsoleLayoutModule {
}

