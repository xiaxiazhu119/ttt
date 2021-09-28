import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsBsDatePickerModule, XNgLibsDirectiveModule, XNgLibsDialogModule } from 'x-ng-libs';

import { ConsoleOrganizationListRoutingModule } from './console-organization-list-routing.module';
import { ConsoleOrganizationListComponent } from './console-organization-list.component';
import { BaseScModule } from '@app/modules/public-api';

@NgModule({
  declarations: [ConsoleOrganizationListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
    ConsoleOrganizationListRoutingModule
  ],
  exports: [ConsoleOrganizationListComponent]
})
export class ConsoleOrganizationListModule { }
