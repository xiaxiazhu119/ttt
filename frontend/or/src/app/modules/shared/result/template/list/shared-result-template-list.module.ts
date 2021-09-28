import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule, MatRadioModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsDirectiveModule } from 'x-ng-libs';

import { BaseScModule } from '../../../sc/base/base-sc.module';

import { SharedResultTemplateListComponent } from './shared-result-template-list.component';



@NgModule({
  declarations: [SharedResultTemplateListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule, MatRadioModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
  ],
  exports: [SharedResultTemplateListComponent]
})
export class SharedResultTemplateListModule { }
