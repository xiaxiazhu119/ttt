import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { SharedUserListModule } from '@app/modules/public-api';

import { ConsoleExpertListRoutingModule } from './console-expert-list-routing.module';
import { ConsoleExpertListComponent } from './console-expert-list.component';

@NgModule({
  declarations: [ConsoleExpertListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule,
    XNgLibsDirectiveModule,
    SharedUserListModule,
    ConsoleExpertListRoutingModule
  ],
  exports: [ConsoleExpertListComponent]
})
export class ConsoleExpertListModule { }
