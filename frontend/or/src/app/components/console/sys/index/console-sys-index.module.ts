import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { SysFieldModule } from '@app/modules/public-api';

import { ConsoleSysIndexRoutingModule } from './console-sys-index-routing.module';
import { ConsoleSysIndexComponent } from './console-sys-index.component';


@NgModule({
  declarations: [ConsoleSysIndexComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SysFieldModule,
    ConsoleSysIndexRoutingModule
  ],
  exports: [ConsoleSysIndexComponent]
})
export class ConsoleSysIndexModule { }
