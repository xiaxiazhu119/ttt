import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { ConsoleResultListRoutingModule } from './console-result-list-routing.module';
import { ConsoleResultListComponent } from './console-result-list.component';
import { SharedResultListModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleResultListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsDirectiveModule,
    SharedResultListModule,
    ConsoleResultListRoutingModule
  ],
  exports: [ConsoleResultListComponent]
})
export class ConsoleResultListModule { }
